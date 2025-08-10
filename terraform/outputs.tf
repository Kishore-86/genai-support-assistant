output "api_url" {
  description = "The endpoint of the API Gateway"
  value       = aws_apigatewayv2_api.genai_api.api_endpoint
}
