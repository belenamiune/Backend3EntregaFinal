import { Router } from "express";
import { generateMockUser, generateMockPet } from "../utils/mocking.utils.js";
import { usersService, petsService } from "../services/index.js";
const router = Router();

router.get("/mockingusers", async (req, res) => {
  let qty = parseInt(req.query.qty) || 50;

  if (isNaN(qty) || qty < 1) {
    return res
      .status(400)
      .send({ status: "error", message: "Invalid count value" });
  }

  const users = [];
  for (let i = 0; i < qty; i++) {
    users.push(await generateMockUser());
  }
  res.send({ status: "success", payload: users });
});

router.get("/mockingpets", (req, res) => {
  let qty = parseInt(req.query.qty) || 20;

  if (isNaN(qty) || qty < 1) {
    return res
      .status(400)
      .send({ error: "El parámetro qty debe ser un entero >= 1" });
  }

  const pets = [];
  for (let i = 0; i < qty; i++) {
    pets.push(generateMockPet());
  }
  res.send({ status: "success", payload: pets });
});

router.post("/generateData", async (req, res) => {
  let { users = 0, pets = 0 } = req.body;

  users = parseInt(users);
  pets = parseInt(pets);

  if (isNaN(users) || users < 0 || isNaN(pets) || pets < 0) {
    return res.status(400).send({
      status: "error",
      error: "Users y Pets deben ser números positivos",
    });
  }

  const createdUsers = [];
  const createdPets = [];

  for (let i = 0; i < users; i++) {
    const user = await generateMockUser();
    const created = await usersService.create(user);
    createdUsers.push(created);
  }

  for (let i = 0; i < pets; i++) {
    const pet = generateMockPet();
    const created = await petsService.create(pet);
    createdPets.push(created);
  }

  res.send({
    status: "success",
    message: `Created ${users} users and ${pets} pets.`,
    data: {
      users: createdUsers,
      pets: createdPets,
    },
  });
});

export default router;
