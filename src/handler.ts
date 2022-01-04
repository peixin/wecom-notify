import { MessagePayload } from "@/types";
import { postMessage } from "@/wecom";
import * as crypto from "@/crypto";

const bodyFormat =
  '{message: { "agentId": number, "content": string, "toUser": string }, timestamp: number}';

export async function handleRequest(request: Request): Promise<Response> {
  const APIKey = request.headers.get("API-KEY");
  if (!APIKey) {
    return new Response(`API-KEY is required in header`, { status: 401 });
  }

  if (request.method.toUpperCase() !== "POST") {
    return new Response(`Need POST method body in json format: ${bodyFormat}`, { status: 405 });
  }

  let bodyJSON: MessagePayload | null = null;

  try {
    bodyJSON = JSON.parse(await request.text()) as MessagePayload;
  } catch {
    return new Response(`Get and parse body error: need body in json format: ${bodyFormat}`, {
      status: 400,
    });
  }

  const { message, timestamp } = bodyJSON;
  if (!message || !timestamp) {
    return new Response(`Need body in json format: ${bodyFormat}`, { status: 400 });
  }

  const now = Math.floor(new Date().getTime() / 1000);
  if (!(timestamp - 10 < now && timestamp + Number(API_KEY_EXPIRES) > now)) {
    return new Response(`API-KEY is expired`, { status: 401 });
  }

  if (!message?.agentId || !message?.content || !message?.toUser) {
    return new Response(`Need body in json format: ${bodyFormat}`, { status: 400 });
  }

  const verified = await crypto.verify(SECRET_KEY, JSON.stringify(bodyJSON), APIKey);

  if (!verified) {
    return new Response(`Authentication failure`, { status: 401 });
  }

  const isOK = await postMessage(message);
  return new Response(`isOK: ${isOK}`);
}
