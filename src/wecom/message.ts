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
      if (!message.msgtype) {
        message.msgtype = "text";
      }
      return {
        "touser": message.touser,
        "msgtype": message.msgtype,
        "agentid": message.agentid,
        [message.msgtype]: {
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
