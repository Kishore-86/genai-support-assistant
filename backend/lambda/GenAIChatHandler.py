import json
import boto3

bedrock = boto3.client("bedrock-runtime")

def lambda_handler(event, context):
    print("🔥 Event received:", event)

    try:
        # Parse input
        body = json.loads(event.get('body', '{}'))
        prompt = body.get("prompt", "")
        print("🧠 Prompt received:", prompt)

        if not prompt:
            raise ValueError("Missing prompt in request")

        # Call Titan model
        response = bedrock.invoke_model(
            modelId="amazon.titan-text-express-v1",
            contentType="application/json",
            accept="application/json",
            body=json.dumps({
                "inputText": prompt
            })
        )

        response_body = json.loads(response['body'].read())
        print("✅ Bedrock response:", response_body)

        output = response_body["results"][0]["outputText"]

        return {
            "statusCode": 200,
            "body": json.dumps({"response": output}),
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST"
            }
        }

    except Exception as e:
        print("❌ Error occurred:", str(e))

        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)}),
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST"
            }
        }
