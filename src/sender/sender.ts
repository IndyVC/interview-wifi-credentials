import { ICredentials } from "../proxyclick/credentials";
import { EmailSender } from "./email-sender";

export class Sender {
  /**
   * Emails the WiFi credentials to the recipient.
   * When recipient/credentials are invalid, it will retry 4 times with a 5 second interval
   *
   * @param {ICredentials} credentials
   * @param {string} recipient
   */
  static async sendMessage(credentials: ICredentials, recipient: string) {
    let retries = 0;
    let retry;

    async function email() {
      if (retries === 4) {
        clearInterval(retry);
      } else {
        await EmailSender.sendEmail(
          recipient,
          `Username: ${credentials.username} and password: ${credentials.password}`
        );
        retries += 1;
      }
    }

    try {
      if (!recipient || !credentials.password || !credentials.username)
        throw "Invalid recipient!";

      await EmailSender.sendEmail(
        recipient,
        `Username: ${credentials.username} and password: ${credentials.password}`
      );
    } catch (e) {
      retry = setInterval(email, 5000);
    }
  }
}
