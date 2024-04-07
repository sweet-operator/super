import { APIGatewayProxyResult } from "aws-lambda";
import { DynamoDB, GetItemCommand } from "@aws-sdk/client-dynamodb";

const tableName = process.env.TABLE_NAME;
const dynamoDbClient = new DynamoDB({ region: "eu-central-1" });

type DBItem = { item_id: string };

export const handler = async (
  event: DBItem
): Promise<APIGatewayProxyResult> => {
  const command = new GetItemCommand({
    TableName: tableName,
    Key: {
      id: { S: event.item_id },
    },
  });
  const response = await dynamoDbClient.send(command);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "ok - item found",
      data: response.Item,
    }),
  };
};
