set -e

REGION="us-west-2"
BUCKET_NAME="sportnumerics-explorer"
CLOUDFRONT_ID="E38ON9IJP6XEDD"

aws configure set region $REGION
aws s3 sync dist "s3://$BUCKET_NAME" --delete
aws configure set preview.cloudfront true
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_ID --paths /index.html /access/app.js /access/app.js.map /favicon.ico
