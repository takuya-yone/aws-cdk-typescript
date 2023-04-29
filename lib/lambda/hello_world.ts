import * as dynamodb from '@aws-sdk/client-dynamodb';
import { v4 as uuidv4 } from 'uuid';

export const handler = async () => {
  const tablename: string = process.env.DYNAMO_TABLE_NAME
    ? process.env.DYNAMO_TABLE_NAME
    : 'Null';
  const responseBody = {
    message: tablename,
    uuid: uuidv4(),
  };

  //   dynamodb.ge
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(responseBody),
  };
};
