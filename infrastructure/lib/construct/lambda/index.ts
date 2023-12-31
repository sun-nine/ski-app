import {
  aws_lambda_nodejs as lambda_nodejs,
  aws_s3 as s3,
  aws_dynamodb as dynamodb,
} from "aws-cdk-lib";
import { Construct } from "constructs";
import { Auth } from "./auth";
import { Users } from "./users";
import { Payment } from "./payment";

export type LambdaProps = {
  dynamoTable: dynamodb.Table;
  bucket: s3.Bucket;
};

export type UserHandlers = {
  getUsers: lambda_nodejs.NodejsFunction;
  getUser: lambda_nodejs.NodejsFunction;
  createUser: lambda_nodejs.NodejsFunction;
};

export type PaymentHandlers = {
  checkout: lambda_nodejs.NodejsFunction;
  webhook: lambda_nodejs.NodejsFunction;
};

export class Lambda extends Construct {
  readonly authorizer: lambda_nodejs.NodejsFunction;
  readonly users: UserHandlers;
  readonly payment: PaymentHandlers;

  constructor(scope: Construct, id: string, props: LambdaProps) {
    super(scope, id);

    const { dynamoTable, bucket } = props;

    const auth = new Auth(this, "Auth");
    this.authorizer = auth.authorizer;

    const users = new Users(this, "Users", { dynamoTable, bucket });
    this.users = {
      getUsers: users.getUsers,
      getUser: users.getUser,
      createUser: users.createUser,
    };

    const payment = new Payment(this, "Payment");
    this.payment = {
      checkout: payment.checkout,
      webhook: payment.webhook,
    };
  }
}
