import * as cdk from "aws-cdk-lib";
import { RemovalPolicy } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create S3 Bucket for hosting
    const siteBucket = new s3.Bucket(this, "MyShopBucket", {
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true
    });

    // Create CloudFront Distribution
    const distribution = new cloudfront.Distribution(this, "Shop-distribution", {
      defaultBehavior: {
        origin: new origins.S3Origin(siteBucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED
      },
      defaultRootObject: "index.html",
      errorResponses: [{
        httpStatus: 403,
        responseHttpStatus: 200,
        responsePagePath: "/index.html"
      }, {
        httpStatus: 404,
        responseHttpStatus: 200,
        responsePagePath: "/index.html"
      }]
    });

    // Deploy frontend app to S3
    new s3deploy.BucketDeployment(this, "Shop-bucket-Deployment", {
      sources: [s3deploy.Source.asset("../dist")],
      destinationBucket: siteBucket,
      distribution: distribution,
      distributionPaths: ["/*"]
    });

    // Output CloudFront URL
    new cdk.CfnOutput(this, "CloudFrontURL", {
      value: distribution.distributionDomainName
    });
  }
}
