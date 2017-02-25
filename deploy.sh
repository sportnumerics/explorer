set -ex

./decrypt.sh
source ./env/env.sh
unset AWS_SESSION_TOKEN

REGION="ap-southeast-2"
APP_NAME="sportnumerics-explorer"
# CLOUDFRONT_ID="E38ON9IJP6XEDD"
STAGE=${STAGE:-dev}
STACK_NAME="$APP_NAME-$STAGE"
BUCKET_NAME="$APP_NAME-$STAGE"
CHANGE_SET_NAME="check-changeset"
TEMPLATE_FILE="cloudformation.json"

aws configure set region $REGION

CHANGE_SET_ARN=$(aws cloudformation create-change-set --change-set-name $CHANGE_SET_NAME --stack-name $STACK_NAME --template-body file://$TEMPLATE_FILE --parameters "ParameterKey=StageParameter,ParameterValue=$STAGE" --query Id --output text)
CHANGES=$(aws cloudformation describe-change-set --change-set-name $CHANGE_SET_ARN --query "length(Changes)")

cleanup() {
  aws cloudformation delete-change-set --change-set-name $CHANGE_SET_ARN
}

if [ $CHANGES -gt 0 ]; then
  aws cloudformation deploy --stack-name $STACK_NAME --parameter-overrides "StageParameter=$STAGE" --template-file $TEMPLATE_FILE || cleanup
fi

cleanup

aws s3 sync dist "s3://$BUCKET_NAME" --delete
# aws configure set preview.cloudfront true
# aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_ID --paths /index.html /access/app.js /access/app.js.map /favicon.ico
