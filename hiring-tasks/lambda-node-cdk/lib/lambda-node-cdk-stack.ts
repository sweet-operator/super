import { Stack, StackProps } from "aws-cdk-lib";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { AttributeType, Table } from "aws-cdk-lib/aws-dynamodb";

export class LambdaNodeCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const table = new Table(this, "MyTable", {
      partitionKey: { name: "id", type: AttributeType.STRING },
    });

    new NodejsFunction(this, "MyFunc", {
      runtime: Runtime.NODEJS_16_X,
      handler: "handler",
      entry: "lib/lambda-node.ts",
      environment: {
        TABLE_NAME: table.tableName,
      },
    });
  }
}
