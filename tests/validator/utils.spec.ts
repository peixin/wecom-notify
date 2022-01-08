import { Message, MessagePayload } from "@/types";
import { validateBody } from "@/validator/utils";

const message: Message = {
  agentId: 1000001,
  toUser: "@all",
  content: "hello",
};

describe("test validate utils", () => {
  describe("test validate body", () => {
    beforeEach(() => {
      jest.useFakeTimers("modern");
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    test("no message", async () => {
      const result = validateBody({
        timestamp: 1,
      } as MessagePayload);

      expect(result.isValid).toBe(false);
      expect(result.response?.status).toBe(400);
      expect((await result.response?.text())?.startsWith("Need body in json format:")).toBeTruthy();
    });

    test("no timestamp", async () => {
      const result = validateBody({
        timestamp: 0,
        message,
      });

      expect(result.isValid).toBe(false);
      expect(result.response?.status).toBe(400);
      expect((await result.response?.text())?.startsWith("Need body in json format:")).toBeTruthy();
    });

    test("timestamp is now", async () => {
      jest.setSystemTime(new Date(2021, 0, 5, 23, 40, 40));
      const result = validateBody({
        timestamp: new Date(2021, 0, 5, 23, 40, 40).getTime() / 1000,
        message,
      } as MessagePayload);

      expect(result.isValid).toBe(true);
      expect(result.response).toBeUndefined();
    });

    test("timestamp is 10 second after than now", async () => {
      jest.setSystemTime(new Date(2021, 0, 5, 23, 40, 40));
      const result = validateBody({
        timestamp: new Date(2021, 0, 5, 23, 40, 50).getTime() / 1000,
        message,
      } as MessagePayload);

      expect(result.isValid).toBe(true);
      expect(result.response).toBeUndefined();
    });

    test("timestamp is 10 second before than now", async () => {
      jest.setSystemTime(new Date(2021, 0, 5, 23, 40, 40));
      const result = validateBody({
        timestamp: new Date(2021, 0, 5, 23, 40, 30).getTime() / 1000,
        message,
      } as MessagePayload);

      expect(result.isValid).toBe(true);
      expect(result.response).toBeUndefined();
    });

    test("timestamp is in 10 seconds validity period", async () => {
      jest.setSystemTime(new Date(2021, 0, 5, 23, 40, 40));
      const result = validateBody({
        timestamp: new Date(2021, 0, 5, 23, 40, 35).getTime() / 1000,
        message,
      } as MessagePayload);

      expect(result.isValid).toBe(true);
      expect(result.response).toBeUndefined();
    });

    test("timestamp is 11 second after than now", async () => {
      jest.setSystemTime(new Date(2021, 0, 5, 23, 40, 40));
      const result = validateBody({
        timestamp: new Date(2021, 0, 5, 23, 40, 51).getTime() / 1000,
        message,
      } as MessagePayload);

      expect(result.isValid).toBe(false);
      expect(result.response?.status).toBe(401);
      expect(await result.response?.text()).toBe("API-KEY is expired");
    });

    test("timestamp is 11 second before than now", async () => {
      jest.setSystemTime(new Date(2021, 0, 5, 23, 40, 40));
      const result = validateBody({
        timestamp: new Date(2021, 0, 5, 23, 40, 29).getTime() / 1000,
        message,
      } as MessagePayload);

      expect(result.isValid).toBe(false);
      expect(result.response?.status).toBe(401);
      expect(await result.response?.text()).toBe("API-KEY is expired");
    });
  });
});
