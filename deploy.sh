#!/bin/bash

set -e

./decrypt.sh
source ./env/env.sh
unset AWS_SESSION_TOKEN

if [ "$LAMBCI_BRANCH" = "master" ]; then
  STACK_PREFIX="sportnumerics-explorer"
  STAGE="prodgreen"
  if aws cloudformation describe-stacks --stack-name "$STACK_PREFIX-$STAGE"; then
    STAGE="prodblue"
  fi
  EXPLORER_API_PREFIX="explorer-api-$STAGE"
else
  STAGE=dev
  EXPLORER_API_PREFIX="explorer-api.dev"
fi

REGION="ap-southeast-2"
APP_NAME="sportnumerics-explorer"
STACK_NAME="$APP_NAME-$STAGE"
BUCKET_NAME="$APP_NAME-$STAGE"
TEMPLATE_FILE="cloudformation.yml"

aws configure set region $REGION

export EXPLORER_API_URL="https://$EXPLORER_API_PREFIX.sportnumerics.com"

npm run dist

aws cloudformation deploy --stack-name $STACK_NAME --parameter-overrides "StageParameter=$STAGE" --template-file $TEMPLATE_FILE || true

aws s3 sync dist "s3://$BUCKET_NAME" --delete
