variable "aws_region" {
  description = "AWS region to deploy resources in"
  type        = string
  default     = "us-east-1"
}

variable "log_retention_days" {
  description = "Number of days to retain Lambda CloudWatch logs"
  type        = number
  default     = 14
}
