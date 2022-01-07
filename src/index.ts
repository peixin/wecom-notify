import { handleRequest } from "@/handler";
import * as utils from "@/utils";

addEventListener("fetch", event => {
  if (CORS === "true" && event.request.method === "OPTIONS") {
    event.respondWith(utils.responseSuccess());
    return;
  }
  event.respondWith(handleRequest(event.request));
});
