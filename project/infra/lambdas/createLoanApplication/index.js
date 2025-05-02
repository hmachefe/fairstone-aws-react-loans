// index.js
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  PutCommand
} = require("@aws-sdk/lib-dynamodb");
const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");

console.log("!!!!!    CREATE APPLICATION !!!!!");

const REGION = process.env.AWS_REGION || "us-east-1";  // or your SES region
const client = new DynamoDBClient({ region: REGION });
const ddb = DynamoDBDocumentClient.from(client);
const ses = new SESClient({ region: REGION });

module.exports.handler = async (event) => {
  // 1. Parse and write to DynamoDB
  const { userId, amount, term } = JSON.parse(event.body);
  const applicationId = `${userId}-${Date.now()}`;

  await ddb.send(
    new PutCommand({
      TableName: "LoanApplications",
      Item: { applicationId, userId, amount, term, status: "PENDING" }
    })
  );

  // 2. Prepare your email parameters
  const emailParams = {
    Source: "hugo.machefer@gmail.com",          // must be a verified identity
    Destination: {
      ToAddresses: ["hugo.machefer@gmail.com"]    // also must be verified in SES sandbox
    },
    Message: {
      Subject: {
        Data: "Your Loan FAIRSTONE (loan) Application has been received",
        Charset: "UTF-8"
      },
      Body: {
        Text: {
          Data: 
`Hello ${userId},

We’ve received your loan application (ID: ${applicationId}) for $${amount} over ${term} months.
We’ll be in touch once it’s processed.

Thank you,
The Loans Team`,
          Charset: "UTF-8"
        }
        // └─ you can add an Html: { Data: "<h1>…</h1>" } section here if you like
      }
    }
  };

  // 3. Send the email
  try {
    const sendResult = await ses.send(new SendEmailCommand(emailParams));
    console.log("SES SendEmail succeeded:", sendResult.MessageId);
  } catch (err) {
    console.error("SES SendEmail failed:", err);
    // re-throw or handle as appropriate
    throw err;
  }

  // 4. Return your response
  return {
    statusCode: 201,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ applicationId })
  };
};
