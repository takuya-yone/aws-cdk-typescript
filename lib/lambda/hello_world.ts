export const handler = async () => {
  const tablename: string = process.env.DYNAMO_TABLE_NAME
    ? process.env.DYNAMO_TABLE_NAME
    : 'Null';
  const responseBody = {
    message: tablename,
  };
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(responseBody),
  };
};
