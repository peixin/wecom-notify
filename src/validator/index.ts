import { MessagePayload } from "@/types";
import * as utils from "@/utils";
import * as validateUtils from "./utils";

export const validateRequest = async (request: Request) => {
  let _validateResult = validateUtils.validateHeader(request);

  if (!_validateResult.isValid) {
    return _validateResult;
  }

  let messagePayload: MessagePayload | null = null;

  try {
    messagePayload = JSON.parse(await request.clone().text()) as MessagePayload;
  } catch {
    return validateUtils.validateResult(
      false,
      utils.responseError(
        `Get and parse body error: need body in json format: ${validateUtils.bodyFormat}`
      )
    );
  }

  _validateResult = validateUtils.validateBody(messagePayload);
  if (!_validateResult.isValid) {
    return _validateResult!;
  }

  _validateResult = await validateUtils.validateAuthentication(
    messagePayload,
    request.headers.get("API-KEY")!
  );

  if (!_validateResult.isValid) {
    return _validateResult!;
  }

  return validateUtils.validateResult(true);
};
