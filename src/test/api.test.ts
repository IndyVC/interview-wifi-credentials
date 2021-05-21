import app from "../api/app";
const request = require("supertest")(app);
import { expect } from "chai";
import { visitors } from "../../data/visitors";

describe("/api/visitors", () => {
  it("Should return an array of visitors", async () => {
    const res = await request.get("/api/visitors").send();
    expect(res.statusCode).equals(200);
  });

  it("Should return 1 visitor with existing email", async () => {
    const email = "jon@snow.com";
    const res = await request.get(`/api/visitors?email=${email}`).send();
    expect(res.statusCode).equals(200);
    expect(res.body).to.deep.equals([visitors[1]]);
  });

  it("Should return no visitor with non-existent email", async () => {
    const email = "indyvancanegem@hotmail.com";
    const res = await request.get(`/api/visitors?email=${email}`).send();
    expect(res.statusCode).equals(200);
    expect(res.body).to.deep.equals([]);
  });
});

describe("/api/check-in", () => {
  it("Should return 204", async () => {
    const res = await request.post("/api/check-in").send({
      firstname: "Khal",
      lastname: "Drogo",
      email: "kdrogo@doth.raki",
    });
    expect(res.statusCode).equals(204);
  });

  it("Should return 500", async () => {
    const nonExistenEmail = "indyvancanegem@hotmail.com";
    const res = await request.post("/api/check-in").send({
      email: nonExistenEmail,
    });
    expect(res.statusCode).equals(500);
  });
});
