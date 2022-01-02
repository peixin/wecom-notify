import { postMessage } from "./wecom";

const getParameter = (searchParams: URLSearchParams, parameterName: string, defaultValue = "") => {
  return (searchParams.get(parameterName) || defaultValue).trim();
};

export async function handleRequest(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);

  const agentId = parseInt(getParameter(searchParams, "agent-id"));
  const message = decodeURIComponent(getParameter(searchParams, "message"));
  const toUser = getParameter(searchParams, "to-user");

  if (!agentId || !message || !toUser.length) {
    return new Response("need url parameters: [agent-id, message, to-user]", { status: 400 });
  }

  const isOK = await postMessage(agentId, toUser, message);
  return new Response(`isOK: ${isOK}`);
}
