// index.js
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  GetCommand
} = require("@aws-sdk/lib-dynamodb");

// initialize once at cold start
const client = new DynamoDBClient({});
const ddb = DynamoDBDocumentClient.from(client);

module.exports.handler = async (event) => {
  // pull the id from pathParameters
  const applicationId = event.pathParameters?.id;
  if (!applicationId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing path parameter 'id'" })
    };
  }

  // fetch from DynamoDB
  const { Item } = await ddb.send(
    new GetCommand({
      TableName: process.env.TABLE_NAME || "LoanApplications",
      Key: { applicationId }
    })
  );

  if (!Item) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "Not found" })
    };
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Item)
  };
};
