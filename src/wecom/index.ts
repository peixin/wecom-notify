import { Message } from "@/types";
import { TextLikeMessage } from "@/wecom/message";
import { getAccessToken, sendMessageResult } from "./utils";

export const postMessage = async (message: Message) => {
  const token = await getAccessToken();
  if (!token) {
    return sendMessageResult(false, "No TOKEN");
  }

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const payload = new TextLikeMessage().toPlain(message);

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(payload),
  };

  try {
    const response = await fetch(
      `https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=${token}`,
      requestOptions
    );

    const responseData = (await response.json()) as { errcode: number };
    if (responseData.errcode !== 0) {
      return sendMessageResult(false, JSON.stringify(responseData));
    } else {
      return sendMessageResult(true, "success");
    }
  } catch (error) {
    return sendMessageResult(false, `fetch api error ${error}`);
  }
};
