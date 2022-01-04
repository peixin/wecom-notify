import { MessagePayload } from "@/types";
import { postMessage } from "@/wecom";
import * as validator from "@/validator";

export async function handleRequest(request: Request): Promise<Response> {
  const { isValid, response } = await validator.validateRequest(request);

  if (!isValid) {
    return response!;
  }

  const { message } = JSON.parse(await request.text()) as MessagePayload;
  const isOK = await postMessage(message);
  return new Response(`isOK: ${isOK}`);
}
