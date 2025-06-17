import { Router } from "express";
import { generateMockUser, generateMockPet } from "../utils/mocking.utils.js";
import { usersService, petsService } from "../services/index.js";
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Mocks
 *   description: Mock data generation endpoints
 */

/**
 * @swagger
 * /api/mocks/mockingusers:
 *   get:
 *     summary: Generate mock users
 *     tags: [Mocks]
 *     parameters:
 *       - in: query
 *         name: qty
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Number of users to generate. Default is 50
 *     responses:
 *       200:
 *         description: Users generated successfully
 *       400:
 *         description: Invalid count value
 */
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

/**
 * @swagger
 * /api/mocks/mockingpets:
 *   get:
 *     summary: Generate mock pets
 *     tags: [Mocks]
 *     parameters:
 *       - in: query
 *         name: qty
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Number of pets to generate. Default is 20
 *     responses:
 *       200:
 *         description: Pets generated successfully
 *       400:
 *         description: Invalid qty parameter
 */
router.get("/mockingpets", (req, res) => {
  let qty = parseInt(req.query.qty) || 20;

  if (isNaN(qty) || qty < 1) {
    return res
      .status(400)
      .send({ error: "Parameter qty should be an integer >= 1" });
  }

  const pets = [];
  for (let i = 0; i < qty; i++) {
    pets.push(generateMockPet());
  }
  res.send({ status: "success", payload: pets });
});

/**
 * @swagger
 * /api/mocks/generateData:
 *   post:
 *     summary: Insert mock users and pets into the database
 *     tags: [Mocks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               users:
 *                 type: integer
 *                 example: 3
 *               pets:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       200:
 *         description: Data inserted successfully
 *       400:
 *         description: Invalid input values
 */
router.post("/generateData", async (req, res) => {
  let { users = 0, pets = 0 } = req.body;

  users = parseInt(users);
  pets = parseInt(pets);

  if (isNaN(users) || users < 0 || isNaN(pets) || pets < 0) {
    return res.status(400).send({
      status: "error",
      error: "Users and Pets should be positive numbers",
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
