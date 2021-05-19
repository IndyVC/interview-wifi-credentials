import { ICredentials } from "../proxyclick/credentials";
import { EmailSender } from "./email-sender";

export class Sender {
  static async sendMessage(credentials: ICredentials, recipient: string) {
    let retries = 0;
    let retry;

    async function email() {
      if (retries === 4) {
        clearInterval(retry);
      } else {
        await EmailSender.sendEmail(recipient, JSON.stringify({ credentials }));
        retries += 1;
      }
    }

    try {
      await EmailSender.sendEmail(recipient, JSON.stringify({ credentials }));
    } catch (e) {
      //60 seconds (60000 ms) * 10 = 10 min
      retry = setInterval(email, 60000 * 10);
    }
  }
}
