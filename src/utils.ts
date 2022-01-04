export const responseError = (message: string, status = 400) => {
  return new Response(message, { status });
};
