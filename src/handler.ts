import { MessagePayload } from "@/types";
import { postMessage } from "@/wecom";
import * as validator from "@/validator";
import * as utils from "@/utils";

export async function handleRequest(request: Request): Promise<Response> {
  const { isValid, response } = await validator.validateRequest(request);

  if (!isValid) {
    return response!;
  }

  const { message, isCustom } = JSON.parse(await request.text()) as MessagePayload;
  const result = await postMessage(message, !!isCustom);
  if (result.isOK) {
    return utils.responseSuccess(`Send message result: ${result.message}`);
  } else {
    return utils.responseError(`Send message result: ${result.message}`);
  }
}
