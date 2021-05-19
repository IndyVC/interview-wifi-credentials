import { expect } from "chai";
import * as sinon from "sinon";

import { Sender } from "../sender/sender";

describe("Email sender", () => {
  it("Should send email correctly", async () => {
    const spy = sinon.spy(console, "log");
    await Sender.sendMessage(
      { username: "test", password: "test" },
      "indyvancanegem@hotmail.com"
    );

    expect(spy.calledWith("sending email")).to.be.true;
    spy.restore();
  });
});
