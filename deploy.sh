#!/bin/bash

set -e

./decrypt.sh
source ./env/env.sh
unset AWS_SESSION_TOKEN

ACTIVE_PROD_DEPLOYMENT=$(./node_modules/.bin/explorer-cdn describe-active-stage)

if [[ "$LAMBCI_BRANCH" = "master" ]]; then
  if [[ "$ACTIVE_PROD_DEPLOYMENT" = "prodgreen" ]]; then
    THIS_DEPLOYMENT="blue"
  else
    THIS_DEPLOYMENT="green"
  fi
  export APP_STAGE=prod
elif [[ "$LAMBCI_BRANCH" =~ ^hotfix ]]; then
  THIS_DEPLOYMENT=${ACTIVE_PROD_DEPLOYMENT#prod}
  export APP_STAGE=prod
else
  export APP_STAGE=dev
fi

if [[ "$APP_STAGE" = "prod" ]]; then
  STAGE="prod$THIS_DEPLOYMENT"
  EXPLORER_API_PREFIX="explorer-api-$THIS_DEPLOYMENT"
else
  STAGE=dev
  EXPLORER_API_PREFIX="explorer-api.dev"
fi

APP_NAME="sportnumerics-explorer"
STACK_NAME="$APP_NAME-$STAGE"
BUCKET_NAME="$APP_NAME-$STAGE"
TEMPLATE_FILE="cloudformation.yml"

aws configure set region $AWS_DEFAULT_REGION

export EXPLORER_API_URL="https://$EXPLORER_API_PREFIX.sportnumerics.com"
export GIT_SHA=`git rev-parse HEAD`

yarn run dist

aws cloudformation deploy --stack-name $STACK_NAME --parameter-overrides "StageParameter=$STAGE" --template-file $TEMPLATE_FILE || true

aws s3 sync dist "s3://$BUCKET_NAME" --delete

if [ "$STAGE" != "dev" ]; then
  CLOUDFRONT_ID=$(aws cloudformation describe-stacks --stack-name sportnumerics-explorer-$STAGE --query 'Stacks[0].Outputs[?OutputKey==`CloudfrontArn`].OutputValue' --output text)
else
  CLOUDFRONT_ID=$(aws cloudformation describe-stacks --stack-name sportnumerics-explorer-cdn-$STAGE --query 'Stacks[0].Outputs[?OutputKey==`CloudfrontArn`].OutputValue' --output text)
fi

aws configure set preview.cloudfront true
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_ID --paths / /logo-196.png /logo-180.png /favicon.ico

