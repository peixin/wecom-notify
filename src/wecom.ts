import { Message, TencentAccessToken } from "@/types";

const getAccessTokenFromCache = async () => {
  try {
    const token = await TENCENT.get("breeze_token", { type: "text" });
    console.log("get token from cache");
    return token;
  } catch {
    return null;
  }
};

const getAccessToken = async () => {
  const token = await getAccessTokenFromCache();
  if (token) {
    return token;
  }

  const url = `https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=${WECOM_CROP_ID}&corpsecret=${WECOM_SECRET}`;

  try {
    const { access_token: accessToken, expires_in: expiresIn } = await fetch(url).then(response =>
      response.json<TencentAccessToken>()
    );

    if (accessToken) {
      const expiration = Math.floor(new Date().getTime() / 1000) + expiresIn - 10;

      TENCENT.put("breeze_token", accessToken, { expiration: expiration });
      console.log("get token from API", { expiration: expiration });
      return accessToken;
    } else {
      console.error("get token error, no accessToken");
      return null;
    }
  } catch (error) {
    console.error("get token error", JSON.stringify(error));
    return null;
  }
};

export const postMessage = async ({ agentId, toUser, content }: Message) => {
  const token = await getAccessToken();
  if (!token) {
    return false;
  }

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const payload = {
    "touser": toUser,
    "msgtype": "text",
    "agentid": agentId,
    "text": {
      "content": content,
    },
    "safe": 0,
    "enable_id_trans": 0,
    "enable_duplicate_check": 0,
    "duplicate_check_interval": 1800,
  };

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(payload),
  };

  const response = await fetch(
    `https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=${token}`,
    requestOptions
  );

  console.log(response.status);
  console.log(await response.json());
  return response.ok;
};
