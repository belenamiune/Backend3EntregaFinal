import request from "supertest";
import { expect } from "chai";
import app from "../app.js";

describe("Functional Tests: users.router.js", function () {
  before(function () {
    this.timeout(10000);
  });
  let createdUserId;

  it("should get all users (GET /api/users)", async function () {
    const res = await request(app).get("/api/users");
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("payload").that.is.an("array");
  });

  it("should create a mock user and return its ID", async function () {
    const user = {
      first_name: "Belén",
      last_name: "Amiune",
      email: "belen@example.com",
      password: "coder123",
      role: "user",
      pets: [],
    };

    const res = await request(app)
      .post("/api/mocks/generateData")
      .send({ users: 1, pets: 0 });

    expect(res.status).to.equal(200);
    expect(res.body.data.users[0]).to.have.property("_id");
    createdUserId = res.body.data.users[0]._id;
  });

  it("should get a user by ID (GET /api/users/:uid)", async function () {
    const res = await request(app).get(`/api/users/${createdUserId}`);
    expect(res.status).to.equal(200);
    expect(res.body.payload).to.have.property("_id");
  });

  it("should delete a user (DELETE /api/users/:uid)", async function () {
    const res = await request(app).delete(`/api/users/${createdUserId}`);
    expect(res.status).to.equal(200);
  });

  it("should return 404 if user does not exist (GET /api/users/:uid)", async function () {
    const res = await request(app).get(`/api/users/666abc123def456789000000`);
    expect(res.status).to.equal(404);
  });
});
