import { handleRequest } from "@/handler";
import * as validator from "@/validator";
import * as wecom from "@/wecom";

describe("test handle", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("request failure", async () => {
    jest
      .spyOn(validator, "validateRequest")
      .mockResolvedValue({ isValid: false, response: new Response("error", { status: 400 }) });

    const request = new Request("/", { method: "POST" });
    const result = await handleRequest(request);

    expect(validator.validateRequest).toHaveBeenLastCalledWith(request);
    expect(result.status).toEqual(400);
    const text = await result.text();
    expect(text).toEqual("error");
  });

  test("request success", async () => {
    jest
      .spyOn(validator, "validateRequest")
      .mockResolvedValue({ isValid: true, response: undefined });

    jest.spyOn(wecom, "postMessage").mockResolvedValue(true);

    const request = new Request("/", { method: "POST", body: "{}" });
    const result = await handleRequest(request);

    expect(result.status).toEqual(200);
    const text = await result.text();
    expect(text).toEqual("isOK: true");
  });
});
