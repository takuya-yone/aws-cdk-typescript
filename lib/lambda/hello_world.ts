import * as dynamodb from '@aws-sdk/client-dynamodb';
import * as ce from '@aws-sdk/client-cost-explorer';
import * as cs from '@aws-sdk/client-support';
import { v4 as uuidv4 } from 'uuid';

export const handler = async () => {
  const tablename: string = process.env.DYNAMO_TABLE_NAME
    ? process.env.DYNAMO_TABLE_NAME
    : 'Null';
  const responseBody = {
    message: tablename,
    uuid: uuidv4(),
  };

  // const int: cs.DateInterval.Start =

  const input: ce.GetCostAndUsageCommandInput = {
    TimePeriod: {
      // DateInterval
      Start: '2023-06-08', // required
      End: '2023-06-09', // required
    },
    Granularity: 'DAILY',
    Metrics: [
      // MetricNames // required
      'UnblendedCost',
    ],
    GroupBy: [
      {
        // GroupDefinition
        Type: 'DIMENSION',
        Key: 'SERVICE',
      },
    ],
  };

  const command = new ce.GetCostAndUsageCommand(input);

  const ceClient = new ce.CostExplorerClient({});

  const response = await ceClient.send(command);

  console.log(response['ResultsByTime']);

  // const res = ceClient.send;

  //   dynamodb.ge
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(response),
  };
};
