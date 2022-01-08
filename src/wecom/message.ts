import { Message } from "@/types";

function isCustomMessage(isCustom: boolean, message: Message | JSON): message is JSON {
  return isCustom;
}

export class WecomMessage {
  private isCustom = false;
  constructor(isCustom: boolean) {
    this.isCustom = isCustom;
  }

  public toPlain(message: Message | JSON) {
    if (isCustomMessage(this.isCustom, message)) {
      return message;
    } else {
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
}
