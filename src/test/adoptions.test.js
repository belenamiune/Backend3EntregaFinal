import request from "supertest";
import mongoose from "mongoose";
import app from "../app.js";

import userModel from "../dao/models/User.js";
import petModel from "../dao/models/Pet.js";
import adoptionModel from "../dao/models/Adoption.js";
import { createHash } from "../utils/index.js";
import chai from "chai";

const expect = chai.expect;

const MONGO_TEST_URL = "mongodb://localhost:27017/mocks-db";

describe("Functional tests: adoption.router.js (Supertest limpio)", () => {
  let userId;
  let petId;
  let adoptionId;

  before(async () => {
    await mongoose.connect(MONGO_TEST_URL);

    await adoptionModel.deleteMany({});
    await petModel.deleteMany({});
    await userModel.deleteMany({});

    const hashedPassword = await createHash("coder123");
    const user = await userModel.create({
      first_name: "Belén",
      last_name: "Amiune",
      email: "belenamiune@hotmail.com",
      password: hashedPassword,
      role: "user",
      pets: [],
    });

    userId = user._id;

    const pet = await petModel.create({
      name: "Fatiga",
      specie: "Dog",
      birthDate: new Date("2020-11-10"),
      adopted: false,
    });

    petId = pet._id;
  });

  after(async () => {
    await adoptionModel.deleteMany({});
    await petModel.deleteMany({});
    await userModel.deleteMany({});
    await mongoose.connection.close();
  });

  it("Must adopt the pet correctly(POST /api/adoptions/:uid/:pid)", async () => {
    const res = await request(app).post(`/api/adoptions/${userId}/${petId}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("status", "success");
    expect(res.body).to.have.property("message", "Pet adopted");

    const adoption = await adoptionModel.findOne({ owner: userId, pet: petId });
    adoptionId = adoption._id;
  });

  it("Must obtain all adoptions (GET /api/adoptions)", async () => {
    const res = await request(app).get("/api/adoptions");

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("status", "success");
    expect(res.body.payload).to.be.an("array");
    expect(res.body.payload.length).to.be.greaterThan(0);
  });

  it("Must obtain an adoption by ID (GET /api/adoptions/:aid)", async () => {
    const res = await request(app).get(`/api/adoptions/${adoptionId}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("status", "success");
    expect(res.body.payload).to.have.property("owner");
    expect(res.body.payload).to.have.property("pet");
  });

  it("Must fail to seek a non-existent adoption", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/api/adoptions/${fakeId}`);

    expect(res.status).to.equal(404);
  });

  it("Must fail to adopt if the pet is already adopted", async () => {
    const res = await request(app).post(`/api/adoptions/${userId}/${petId}`);

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property("error", "Pet is already adopted");
  });
});
