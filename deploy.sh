#!/bin/bash

set -e

./decrypt.sh
source ./env/env.sh
unset AWS_SESSION_TOKEN

REGION="ap-southeast-2"
APP_NAME="sportnumerics-explorer"
STAGE=${STAGE:-dev}
STACK_NAME="$APP_NAME-$STAGE"
BUCKET_NAME="$APP_NAME-$STAGE"
CHANGE_SET_NAME="check-changeset"
TEMPLATE_FILE="cloudformation.json"

aws configure set region $REGION

aws cloudformation deploy --stack-name $STACK_NAME --parameter-overrides "StageParameter=$STAGE" --template-file $TEMPLATE_FILE || true

CLOUDFRONT_ID=$(aws cloudformation describe-stacks --stack-name sportnumerics-explorer-dev --query 'Stacks[0].Outputs[?OutputKey==`CloudfrontArn`].OutputValue' --output text)

aws s3 sync dist "s3://$BUCKET_NAME" --delete
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_ID --paths /index.html /access/app.js /access/app.js.map /logo-196.png /favicon.ico
