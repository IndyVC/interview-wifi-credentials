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

  it("Should retry to send the email 4 times, because recipient is invalid", async () => {
    const spy = sinon.spy(console, "log");
    const clock = sinon.useFakeTimers();

    await Sender.sendMessage({ username: "test", password: "test" }, "");
    //First
    clock.tick(5000);
    expect(spy.calledWith("sending email")).to.be.true;
    clock.tick(5000);
    expect(spy.calledWith("sending email")).to.be.true;
    clock.tick(5000);
    expect(spy.calledWith("sending email")).to.be.true;
    clock.tick(5000);
    expect(spy.calledWith("sending email")).to.be.true;
    expect(spy.callCount).to.equal(4);
    spy.restore();
  });

  it("Should retry to send the email 4 times, because username is invalid", async () => {
    const spy = sinon.spy(console, "log");
    const clock = sinon.useFakeTimers();

    await Sender.sendMessage(
      { username: "", password: "test" },
      "indyvancanegem@hotmail.com"
    );
    //First
    clock.tick(5000);
    expect(spy.calledWith("sending email")).to.be.true;
    clock.tick(5000);
    expect(spy.calledWith("sending email")).to.be.true;
    clock.tick(5000);
    expect(spy.calledWith("sending email")).to.be.true;
    clock.tick(5000);
    expect(spy.calledWith("sending email")).to.be.true;
    expect(spy.callCount).to.equal(4);
    spy.restore();
  });

  it("Should retry to send the email 4 times, because password is invalid", async () => {
    const spy = sinon.spy(console, "log");
    const clock = sinon.useFakeTimers();

    await Sender.sendMessage(
      { username: "test", password: "" },
      "indyvancanegem@hotmail.com"
    );
    clock.tick(5000);
    expect(spy.calledWith("sending email")).to.be.true;
    clock.tick(5000);
    expect(spy.calledWith("sending email")).to.be.true;
    clock.tick(5000);
    expect(spy.calledWith("sending email")).to.be.true;
    clock.tick(5000);
    expect(spy.calledWith("sending email")).to.be.true;
    expect(spy.callCount).to.equal(4);
    spy.restore();
  });
});
