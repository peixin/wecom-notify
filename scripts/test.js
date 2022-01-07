require("dotenv").config();
const crypto = require("crypto");
const { exec } = require("child_process");

const payload = JSON.stringify({
  message: {
    "agentId": 1000001,
    "toUser": "@all",
    "content": "test 😄🚗 🇨🇳☯️",
  },
  timestamp: Math.floor(new Date().getTime() / 1000),
});

const sign = (secret, payload) => {
  const signatureStr = crypto.createHmac("sha256", secret).update(payload).digest("base64");
  return signatureStr;
};

const request = (apiKey, body) => {
  const curlCommand = `
  curl -X POST \
    'http://localhost:8787' \
    -H 'API-KEY: ${apiKey}' \
    -d '${body}'
  `;

  exec(curlCommand, (error, stdout) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    console.log(`stdout:\n${stdout}`);
  });
};

const test = () => {
  const signatureStr = sign(process.env.SECRET_KEY, payload);

  console.log(`payload: ${payload}`);
  console.log(`signatureStr: ${signatureStr}`);
  console.log("============ Request ============");
  request(signatureStr, payload);
};

test();
