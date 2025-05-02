# Terraform AWS Lambda + DynamoDB Package

## Structure

- `lambdas/` - Contains your raw Lambda JS code.
  - `createLoanApplication/index.js`
  - `getLoanApplications/index.js`
- `main.tf` - Terraform configuration.
- `variables.tf` - Terraform variables.
- `lambda_zips/` - Auto-generated ZIPs (ignored in Git).
- `.gitignore` - Excludes build artifacts and Terraform state.

## Usage

1. Clone this repo.
2. `cd` into the folder.
3. `terraform init`
4. `terraform apply`

Your Lambdas will be zipped at apply time and deployed automatically.
