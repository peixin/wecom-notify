import { TencentAccessToken } from "@/types";

const getAccessTokenFromCache = async () => {
  try {
    const token = await TENCENT.get("breeze_token", { type: "text" });
    console.log("get token from cache");
    return token;
  } catch {
    return null;
  }
};

export const getAccessToken = async () => {
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

export const sendMessageResult = (isOK: boolean, message: string) => ({
  isOK,
  message,
});
