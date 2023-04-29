import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { SqsEventSource } from 'aws-cdk-lib/aws-lambda-event-sources';

export class CdkTsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const table = new dynamodb.Table(this, 'Table', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    });

    // console.log(table);
    // console.log("heeelleoeoeieoeoe--e-e--");

    // example resource
    const queue = new sqs.Queue(this, 'CdkTsQueue', {
      visibilityTimeout: cdk.Duration.seconds(300),
    });
    const eventSource = new SqsEventSource(queue);

    const func = new NodejsFunction(this, 'Function', {
      entry: 'lib/lambda/hello_world.ts',
      runtime: lambda.Runtime.NODEJS_18_X,
      environment: { DYNAMO_TABLE_NAME: table.tableName },
      tracing: lambda.Tracing.ACTIVE,
      timeout: cdk.Duration.seconds(30),
    });
    func.addEventSource(eventSource);

    const api = new apigateway.LambdaRestApi(this, 'cdk-typescript-api', {
      handler: func,
      proxy: false,
    });

    const items = api.root.addResource('api');
    items.addMethod('GET'); // GET /items
  }
}
