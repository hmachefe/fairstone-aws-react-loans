// index.js
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  ScanCommand
} = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const ddb    = DynamoDBDocumentClient.from(client);

module.exports.handler = async () => {
  // full table scan (OK for small/dev tables)
  const { Items } = await ddb.send(
    new ScanCommand({ TableName: process.env.TABLE_NAME })
  );

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Items)
  };
};
