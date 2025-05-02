terraform {
  required_version = ">= 1.0.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 4.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# -------------------------------------------------------------------
# 1) Package your Lambdas on-the-fly
# -------------------------------------------------------------------

data "archive_file" "create_loan_application" {
  type        = "zip"
  source_dir  = "${path.module}/lambdas/createLoanApplication"
  output_path = "${path.module}/lambda_zips/createLoanApplication.zip"
}

data "archive_file" "get_loan_applications" {
  type        = "zip"
  source_dir  = "${path.module}/lambdas/getLoanApplications"
  output_path = "${path.module}/lambda_zips/getLoanApplications.zip"
}

# -------------------------------------------------------------------
# 2) IAM Role & Policy for all Lambdas
# -------------------------------------------------------------------

resource "aws_iam_role" "lambda_exec" {
  name = "lambda_exec_role"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [{
    "Action": "sts:AssumeRole",
    "Principal": { "Service": "lambda.amazonaws.com" },
    "Effect": "Allow",
    "Sid": ""
  }]
}
EOF
}

resource "aws_iam_role_policy" "lambda_exec_policy" {
  name = "lambda_exec_policy"
  role = aws_iam_role.lambda_exec.id

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:logs:*:*:*"
    },
    {
      "Action": [
        "dynamodb:PutItem",
        "dynamodb:GetItem",
        "dynamodb:Scan",
        "dynamodb:UpdateItem",
        "dynamodb:DeleteItem"
      ],
      "Effect": "Allow",
      "Resource": "${aws_dynamodb_table.loan_applications.arn}"
    }
  ]
}
EOF
}

# -------------------------------------------------------------------
# 3) DynamoDB Table
# -------------------------------------------------------------------

resource "aws_dynamodb_table" "loan_applications" {
  name         = "LoanApplications"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"

  attribute {
    name = "id"
    type = "S"
  }
}

# -------------------------------------------------------------------
# 4) Lambda Functions
# -------------------------------------------------------------------

resource "aws_lambda_function" "create_loan_application" {
  function_name    = "createLoanApplication"
  filename         = data.archive_file.create_loan_application.output_path
  source_code_hash = data.archive_file.create_loan_application.output_base64sha256

  handler = "index.handler"
  runtime = "nodejs16.x"
  role    = aws_iam_role.lambda_exec.arn

  environment {
    variables = {
      TABLE_NAME = aws_dynamodb_table.loan_applications.name
    }
  }
}

resource "aws_lambda_function" "get_loan_applications" {
  function_name    = "getLoanApplications"
  filename         = data.archive_file.get_loan_applications.output_path
  source_code_hash = data.archive_file.get_loan_applications.output_base64sha256

  handler = "index.handler"
  runtime = "nodejs16.x"
  role    = aws_iam_role.lambda_exec.arn

  environment {
    variables = {
      TABLE_NAME = aws_dynamodb_table.loan_applications.name
    }
  }
}

# -------------------------------------------------------------------
# 5) Optional: CloudWatch Log Retention
# -------------------------------------------------------------------

resource "aws_cloudwatch_log_group" "create_loan_application_logs" {
  name              = "/aws/lambda/${aws_lambda_function.create_loan_application.function_name}"
  retention_in_days = var.log_retention_days
}

resource "aws_cloudwatch_log_group" "get_loan_applications_logs" {
  name              = "/aws/lambda/${aws_lambda_function.get_loan_applications.function_name}"
  retention_in_days = var.log_retention_days
}

# -------------------------------------------------------------------
# 6) Outputs
# -------------------------------------------------------------------

output "create_loan_application_arn" {
  description = "ARN of the createLoanApplication Lambda"
  value       = aws_lambda_function.create_loan_application.arn
}

output "get_loan_applications_arn" {
  description = "ARN of the getLoanApplications Lambda"
  value       = aws_lambda_function.get_loan_applications.arn
}
