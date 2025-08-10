# GenAI Customer Support Assistant

## Project Overview
Build a generative AI-powered customer support assistant using AWS services.

- **Frontend:** Chatbot-style UI using HTML, Tailwind CSS, and JavaScript  
- **Backend:** AWS Lambda (Python) triggered via API Gateway  
- **AI Model:** Amazon Bedrock Titan Text model  
- **Data Storage:** Amazon DynamoDB for conversations  
- **Document Processing:** Amazon Textract (for optional text extraction features)  
- **Optional Logging:** Store request/response JSON files in Amazon S3  

## Features
- Text-only customer queries handled via chatbot UI  
- Serverless backend calling Amazon Bedrock for AI responses  
- Conversation history saved in DynamoDB  
- Optional request/response logging to S3  
- (Optional) Document text extraction using Amazon Textract  
- All AWS resources set up via AWS Console (no CLI tools)  
- No authentication required  

## Folder Structure


## Setup and Deployment

1. Build and deploy the **frontend** files to a static web hosting service (e.g., S3 static hosting or your choice).  
2. Create the **backend Lambda function** in AWS Console with `lambda_function.py` code.  
3. Set up **API Gateway** to trigger the Lambda function on HTTP POST requests.  
4. Create a **DynamoDB** table to store queries and responses.  
5. (Optional) Create an **S3 bucket** for logging JSON files.  
6. Configure the Lambda function with necessary IAM permissions to invoke Bedrock, access DynamoDB, Textract, and S3.  
7. Connect the frontend to API Gateway endpoint to send queries and receive responses.  

## Technologies Used
- AWS Lambda, API Gateway, DynamoDB, S3, Bedrock, Textract  
- Python (boto3) for Lambda function  
- HTML, Tailwind CSS, JavaScript for frontend  

## Demo Video
[![Watch the demo](assets/demo_screenshot.png)](https://www.youtube.com/watch?v=YOUR_VIDEO_ID)

## Screenshots

### Chatbot UI
![Chatbot UI](frontend/assets/UI.png)

