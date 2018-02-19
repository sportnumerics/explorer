#!/bin/bash

set -e

./decrypt.sh
source ./env/env.sh
unset AWS_SESSION_TOKEN

if [ "$LAMBCI_BRANCH" = "master" ]; then
  CDN_STACK_NAME="sportnumerics-explorer-cdn-prod"
  CDN_STACK_REGION="ap-southeast-2"
  ACTIVE_DEPLOYMENT=$(aws --region $CDN_STACK_REGION cloudformation describe-stacks --stack-name $CDN_STACK_NAME --query 'Stacks[0].Outputs[?OutputKey==`ExplorerStageDeployment`].OutputValue' --output text)
  if [ "$ACTIVE_DEPLOYMENT" = "prodgreen" ]; then
    STAGE="prodblue"
    EXPLORER_API_PREFIX="explorer-api-blue"
  else
    STAGE="prodgreen"
    EXPLORER_API_PREFIX="explorer-api-green"
  fi
  export APP_STAGE=prod
else
  STAGE=dev
  export APP_STAGE=dev
  EXPLORER_API_PREFIX="explorer-api.dev"
fi

APP_NAME="sportnumerics-explorer"
STACK_NAME="$APP_NAME-$STAGE"
BUCKET_NAME="$APP_NAME-$STAGE"
TEMPLATE_FILE="cloudformation.yml"

aws configure set region $AWS_DEFAULT_REGION

export EXPLORER_API_URL="https://$EXPLORER_API_PREFIX.sportnumerics.com"

npm run dist

aws cloudformation deploy --stack-name $STACK_NAME --parameter-overrides "StageParameter=$STAGE" --template-file $TEMPLATE_FILE || true

aws s3 sync dist "s3://$BUCKET_NAME" --delete

if [ "$STAGE" != "dev" ]; then
  CLOUDFRONT_ID=$(aws cloudformation describe-stacks --stack-name sportnumerics-explorer-$STAGE --query 'Stacks[0].Outputs[?OutputKey==`CloudfrontArn`].OutputValue' --output text)
else
  CLOUDFRONT_ID=$(aws cloudformation describe-stacks --stack-name sportnumerics-explorer-cdn-$STAGE --query 'Stacks[0].Outputs[?OutputKey==`CloudfrontArn`].OutputValue' --output text)
fi

aws configure set preview.cloudfront true
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_ID --paths / /logo-196.png /logo-180.png /favicon.ico

