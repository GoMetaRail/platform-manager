import { AmplifyS3ResourceTemplate } from '@aws-amplify/cli-extensibility-helper';

export function override (resources: AmplifyS3ResourceTemplate) {
  resources.addCfnResource({
    type: "AWS::S3::BucketPolicy",
    properties: {
      "Bucket": { "Ref": "S3Bucket" },
      "PolicyDocument": {
        "Statement": [{
          "Sid": "AllowCloudFrontServicePrincipal",
          "Effect": "Allow",
          "Principal": {
            "Service": "cloudfront.amazonaws.com"
          },
          "Action": "s3:GetObject",
          "Resource": `${resources.s3Bucket.attrArn}/*`,
          "Condition": {
            "StringLike": {
              "AWS:SourceArn": "arn:aws:cloudfront::777849778645:distribution/*"
            }
          }
        }]
      }
    }
  }, "PolicyForCloudFrontPrivateContent");
}
