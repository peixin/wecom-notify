import { MessagePayload } from "@/types";
import * as utils from "@/utils";
import * as crypto from "@/crypto";

export const bodyFormat =
  '{message: { "agentId": number, "content": string, "toUser": string }, timestamp: number}';

export const validateResult = (isValid: boolean, response?: Response) => ({ isValid, response });

export const validateHeader = (request: Request) => {
  const APIKey = request.headers.get("API-KEY");
  if (!APIKey) {
    return validateResult(false, utils.responseError("API-KEY is required in header", 401));
  }

  if (request.method.toUpperCase() !== "POST") {
    return validateResult(
      false,
      utils.responseError(`Need POST method body in json format: ${bodyFormat}`, 405)
    );
  }

  return validateResult(true);
};

export const validateBody = (messagePayload: MessagePayload) => {
  const { message, timestamp } = messagePayload;
  if (!message || !timestamp) {
    return validateResult(false, utils.responseError(`Need body in json format: ${bodyFormat}`));
  }

  const now = Math.floor(new Date().getTime() / 1000);

  if (Math.abs(now - timestamp) > Number(API_KEY_EXPIRES)) {
    return validateResult(false, utils.responseError(`API-KEY is expired`, 401));
  }

  if (messagePayload.isCustom) {
    return validateResult(true);
  }

  if (!message?.agentId || !message?.content || !message?.toUser) {
    return validateResult(false, utils.responseError(`Need body in json format: ${bodyFormat}`));
  }

  return validateResult(true);
};

export const validateAuthentication = async (messagePayload: MessagePayload, APIKey: string) => {
  const verified = await crypto.verify(SECRET_KEY, JSON.stringify(messagePayload), APIKey);

  if (!verified) {
    return validateResult(false, utils.responseError("Authentication failure", 401));
  }

  return validateResult(true);
};
