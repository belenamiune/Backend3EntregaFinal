import { Router } from "express";
import adoptionsController from "../controllers/adoptions.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Adoptions
 *   description: Pet adoption endpoints
 */

/**
 * @swagger
 * /api/adoptions:
 *   get:
 *     summary: Get all adoptions
 *     tags: [Adoptions]
 *     responses:
 *       200:
 *         description: List of adoptions retrieved successfully
 */
router.get("/", adoptionsController.getAllAdoptions);

/**
 * @swagger
 * /api/adoptions/{aid}:
 *   get:
 *     summary: Get an adoption by ID
 *     tags: [Adoptions]
 *     parameters:
 *       - in: path
 *         name: aid
 *         required: true
 *         schema:
 *           type: string
 *         description: Adoption ID
 *     responses:
 *       200:
 *         description: Adoption found
 *       404:
 *         description: Adoption not found
 */
router.get("/:aid", adoptionsController.getAdoption);

/**
 * @swagger
 * /api/adoptions/{uid}/{pid}:
 *   post:
 *     summary: Adopt a pet
 *     tags: [Adoptions]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *         description: Pet ID
 *     responses:
 *       200:
 *         description: Pet successfully adopted
 *       400:
 *         description: Adoption failed (e.g., already adopted)
 */
router.post("/:uid/:pid", adoptionsController.createAdoption);

export default router;
