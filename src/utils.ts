const CORS_HEADER =
  CORS === "true"
    ? {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
        "Access-Control-Allow-Headers": "API-KEY",
      }
    : undefined;

export const responseError = (message?: string, status = 400) => {
  return new Response(message, {
    status,
    headers: CORS_HEADER,
  });
};

export const responseSuccess = (message?: string, status = 200) => {
  return new Response(message, {
    status,
    headers: CORS_HEADER,
  });
};
