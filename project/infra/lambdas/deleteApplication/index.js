// index.js
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  DeleteCommand
} = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const ddb    = DynamoDBDocumentClient.from(client);

module.exports.handler = async (event) => {
  const applicationId = event.pathParameters?.id;
  if (!applicationId) {
    return { statusCode: 400, body: "Missing path parameter 'id'" };
  }

  await ddb.send(
    new DeleteCommand({
      TableName: process.env.TABLE_NAME,
      Key: { applicationId }
    })
  );

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: "Deleted" })
  };
};
