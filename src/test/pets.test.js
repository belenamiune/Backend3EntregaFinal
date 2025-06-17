import request from "supertest";
import { expect } from "chai";
import app from "../app.js";

describe("Functional Tests: pets.router.js", function () {
  this.timeout(5000);
  let createdPetId;

  it("should get all pets (GET /api/pets)", async function () {
    const res = await request(app).get("/api/pets");
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("payload").that.is.an("array");
  });

  it("should create a new pet (POST /api/pets)", async function () {
    const pet = {
      name: "Luna",
      specie: "cat",
      adopted: false,
      birthDate: "2020-06-01",
    };

    const res = await request(app).post("/api/pets").send(pet);
    expect(res.status).to.equal(201);
    expect(res.body.payload).to.have.property("_id");
    createdPetId = res.body.payload._id;
  });

  it("should update a pet (PUT /api/pets/:pid)", async function () {
    const res = await request(app).put(`/api/pets/${createdPetId}`).send({
      name: "Luna Updated",
      specie: "cat",
      adopted: true,
      birthDate: "2020-06-01",
    });
    expect(res.status).to.equal(200);
    expect(res.body.payload.name).to.equal("Luna");
  });

  it("should delete a pet (DELETE /api/pets/:pid)", async function () {
    const res = await request(app).delete(`/api/pets/${createdPetId}`);
    expect(res.status).to.equal(200);
  });

  it("should return 404 if pet does not exist (GET /api/pets/:pid)", async function () {
    const res = await request(app).get(`/api/pets/666abc123def456789000000`);
    expect(res.status).to.equal(404);
  });
});
