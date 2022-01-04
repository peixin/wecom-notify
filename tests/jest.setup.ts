import makeServiceWorkerEnv from "service-worker-mock";

declare const global: any;

Object.assign(global, makeServiceWorkerEnv());
