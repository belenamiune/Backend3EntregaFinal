import request from "supertest";
import { expect } from "chai";
import app from "../app.js";

describe("Functional Tests: sessions.router.js", function () {
  this.timeout(5000);
  const testUser = {
    first_name: "TestUser",
    last_name: "Mock",
    email: `belu.test.${Date.now()}@example.com`,
    password: "coder123",
  };

  it("should register a new user (POST /api/sessions/register)", async () => {
    const res = await request(app)
      .post("/api/sessions/register")
      .send(testUser);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("status", "success");
  });

  it("should login with registered user (POST /api/sessions/login)", async () => {
    const res = await request(app).post("/api/sessions/login").send({
      email: testUser.email,
      password: testUser.password,
    });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("status", "success");
  });
});
