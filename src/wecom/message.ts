import { Message } from "@/types";

export class TextLikeMessage {
  public toPlain(message: Message) {
    if (!message.messageType) {
      message.messageType = "text";
    }
    return {
      "touser": message.toUser,
      "msgtype": message.messageType,
      "agentid": message.agentId,
      [message.messageType]: {
        "content": message.content,
      },
      "safe": 0,
      "enable_id_trans": 0,
      "enable_duplicate_check": 0,
      "duplicate_check_interval": 1800,
    };
  }
}
