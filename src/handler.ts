import { postMessage } from "./wecom";

export async function handleRequest(request: Request): Promise<Response> {
  const isOK = await postMessage("test");
  return new Response(`isOK: ${isOK}`);
}
