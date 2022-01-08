from dotenv import load_dotenv
load_dotenv()
import hmac
from hashlib import sha256
import json
import time
import math
import base64
import http.client
import os

payload = json.dumps({
  "message": {
    "agentId": 1000001,
    "toUser": "@all",
    "content": "test 😄🚗 🇨🇳☯️",
  },
  "timestamp": math.floor(time.time()) 
}, separators=(',', ':'), ensure_ascii=False)



def sign(secret: str, payload:str):
    digest = hmac.new(secret.encode("UTF-8"), payload.encode("UTF-8"), digestmod = sha256).digest()
    signature = base64.b64encode(digest).decode("UTF-8")
    return signature


def request(apiKey:str, body:str):
    conn = http.client.HTTPConnection("localhost", 8787)
    conn.request("POST", "/", body.encode("UTF-8"), {"API-KEY": apiKey})
    response = conn.getresponse()
    result = response.read()
    print(result.decode("UTF-8"))

def main():
    signature = sign(os.getenv("SECRET_KEY"), payload)
    print(f"payload: ${payload}");
    print(f"signatureStr: ${signature}");
    print("============ Request ============");
    request(signature, payload)


if __name__ == "__main__":
    main()
