#!/bin/bash

set -e

./decrypt.sh
source ./env/env.sh
unset AWS_SESSION_TOKEN

if [ "$LAMBCI_BRANCH" = "master" ]; then
  export STAGE=prod
  EXPLORER_API_PREFIX="explorer-api"
else
  export STAGE=dev
  EXPLORER_API_PREFIX="explorer-api.dev"
fi

REGION="ap-southeast-2"
APP_NAME="sportnumerics-explorer"
STACK_NAME="$APP_NAME-$STAGE"
BUCKET_NAME="$APP_NAME-$STAGE"
CHANGE_SET_NAME="check-changeset"
TEMPLATE_FILE="cloudformation.yml"

aws configure set region $REGION

export EXPLORER_API_URL="https://$EXPLORER_API_PREFIX.sportnumerics.com"

npm run dist

aws cloudformation deploy --stack-name $STACK_NAME --parameter-overrides "StageParameter=$STAGE" --template-file $TEMPLATE_FILE || true

CLOUDFRONT_ID=$(aws cloudformation describe-stacks --stack-name sportnumerics-explorer-$STAGE --query 'Stacks[0].Outputs[?OutputKey==`CloudfrontArn`].OutputValue' --output text)

aws s3 sync dist "s3://$BUCKET_NAME" --delete
aws configure set preview.cloudfront true
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_ID --paths / /assets/app.js /assets/app.js.map /logo-196.png /favicon.ico
