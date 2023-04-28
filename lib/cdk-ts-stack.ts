import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { SqsEventSource } from 'aws-cdk-lib/aws-lambda-event-sources';

export class CdkTsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    const queue = new sqs.Queue(this, 'CdkTsQueue', {
      visibilityTimeout: cdk.Duration.seconds(300),
    });
    const eventSource = new SqsEventSource(queue);

    const func = new NodejsFunction(this, 'Function', {
      entry: 'lib/lambda/hello_world.ts',
      runtime: Runtime.NODEJS_18_X,
    });
    func.addEventSource(eventSource);
  }
}
