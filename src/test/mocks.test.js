import request from "supertest";
import { expect } from "chai";
import app from "../app.js";

describe("Functional Tests: mocks.router.js", function () {
  this.timeout(5000);

  it("should generate default number of mock users", async function () {
    const res = await request(app).get("/api/mocks/mockingusers");
    expect(res.status).to.equal(200);
    expect(res.body.payload).to.be.an("array").with.lengthOf(50);
  });

  it("should generate 10 mock users", async function () {
    const res = await request(app).get("/api/mocks/mockingusers?qty=10");
    expect(res.status).to.equal(200);
    expect(res.body.payload).to.be.an("array").with.lengthOf(10);
  });

  it("should return 400 for invalid user qty", async function () {
    const res = await request(app).get("/api/mocks/mockingusers?qty=-2");
    expect(res.status).to.equal(400);
  });

  it("should generate default number of mock pets", async function () {
    const res = await request(app).get("/api/mocks/mockingpets");
    expect(res.status).to.equal(200);
    expect(res.body.payload).to.be.an("array").with.lengthOf(20);
  });

  it("should generate 5 mock pets", async function () {
    const res = await request(app).get("/api/mocks/mockingpets?qty=5");
    expect(res.status).to.equal(200);
    expect(res.body.payload).to.be.an("array").with.lengthOf(5);
  });

  it("should return 400 for invalid pet qty", async function () {
    const res = await request(app).get("/api/mocks/mockingpets?qty=-2");
    expect(res.status).to.equal(400);
  });

  it("should insert mock users and pets into DB", async function () {
    const res = await request(app)
      .post("/api/mocks/generateData")
      .send({ users: 2, pets: 3 });
    expect(res.status).to.equal(200);
    expect(res.body.data.users).to.be.an("array").with.lengthOf(2);
    expect(res.body.data.pets).to.be.an("array").with.lengthOf(3);
  });

  it("should return 400 for invalid generateData input", async function () {
    const res = await request(app)
      .post("/api/mocks/generateData")
      .send({ users: "abc", pets: -1 });
    expect(res.status).to.equal(400);
  });
});
