import { Router } from "express";
import petsController from "../controllers/pets.controller.js";
import uploader from "../utils/uploader.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Pets
 *   description: Pet management
 */

/**
 * @swagger
 * /api/pets:
 *   get:
 *     summary: Get all pets
 *     tags: [Pets]
 *     responses:
 *       200:
 *         description: List of all pets
 */
router.get("/", petsController.getAllPets);

/**
 * @swagger
 * /api/pets/{uid}:
 *   get:
 *     summary: Get a pet by ID
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: The pet ID
 *     responses:
 *       200:
 *         description: Pet found.
 *       404:
 *         description: Pet not found.
 */
router.get("/:uid", petsController.getPet);

/**
 * @swagger
 * /api/pets:
 *   post:
 *     summary: Create a new pet
 *     tags: [Pets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               specie:
 *                 type: string
 *               adopted:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Pet created
 */
router.post("/", petsController.createPet);

/**
 * @swagger
 * /api/pets/withimage:
 *   post:
 *     summary: Create a new pet with image upload
 *     tags: [Pets]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               name:
 *                 type: string
 *               specie:
 *                 type: string
 *     responses:
 *       201:
 *         description: Pet with image created
 */
router.post(
  "/withimage",
  uploader.single("image"),
  petsController.createPetWithImage
);

/**
 * @swagger
 * /api/pets/{pid}:
 *   put:
 *     summary: Update a pet by ID
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *         description: Pet ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               specie:
 *                 type: string
 *               adopted:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Pet updated
 *       404:
 *         description: Pet not found
 */
router.put("/:pid", petsController.updatePet);

/**
 * @swagger
 * /api/pets/{pid}:
 *   delete:
 *     summary: Delete a pet by ID
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *         description: Pet ID
 *     responses:
 *       200:
 *         description: Pet deleted
 *       404:
 *         description: Pet not found
 */
router.delete("/:pid", petsController.deletePet);

export default router;
