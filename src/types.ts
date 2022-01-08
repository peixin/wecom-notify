export interface Message {
  agentid: number;
  touser: string;
  msgtype?: "text" | "markdown";
  content: string;
}

export interface MessagePayload {
  timestamp: number;
  isCustom?: boolean;
  message: Message;
}

export interface TencentAccessToken {
  "access_token": string;
  "expires_in": number;
}
