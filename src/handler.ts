import { postMessage } from "./wecom";

const bodyFormat = '{ "agentId": number, "message": string, "toUser": string }';

export async function handleRequest(request: Request): Promise<Response> {
  if (request.method.toUpperCase() !== "POST") {
    return new Response(`Need POST method body in json format: ${bodyFormat}`, { status: 405 });
  }

  let bodyJSON = null;

  try {
    bodyJSON = JSON.parse(await request.text());
  } catch {
    return new Response(`Get and parse body error: need body in json format: ${bodyFormat}`, {
      status: 400,
    });
  }

  const { agentId, message, toUser } = bodyJSON;

  if (!agentId || !message || !toUser) {
    return new Response(`Need body in json format: ${bodyFormat}`, { status: 400 });
  }

  const isOK = await postMessage(agentId, toUser, message);
  return new Response(`isOK: ${isOK}`);
}
