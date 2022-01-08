import makeServiceWorkerEnv from "service-worker-mock";

declare const global: any;

Object.assign(global, makeServiceWorkerEnv());

Object.defineProperties(global, {
  "CORS": { value: "true" },
  "API_KEY_EXPIRES": { value: "10" },
  "SECRET_KEY_USED_AS_API_KEY": { value: "false" },
});
