import { Router } from "express";
import sessionsController from "../controllers/sessions.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Sessions
 *   description: User authentication and session management
 */

/**
 * @swagger
 * /api/sessions/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Sessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - last_name
 *               - email
 *               - password
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input or user already exists
 */
router.post("/register", sessionsController.register);

/**
 * @swagger
 * /api/sessions/login:
 *   post:
 *     summary: Log in an existing user
 *     tags: [Sessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", sessionsController.login);

/**
 * @swagger
 * /api/sessions/current:
 *   get:
 *     summary: Get the current authenticated user
 *     tags: [Sessions]
 *     responses:
 *       200:
 *         description: Current user data
 *       401:
 *         description: Unauthorized
 */
router.get("/current", sessionsController.current);

/**
 * @swagger
 * /api/sessions/unprotectedLogin:
 *   get:
 *     summary: Login without cookie/session protection
 *     tags: [Sessions]
 *     responses:
 *       200:
 *         description: Simulated unprotected login
 */
router.get("/unprotectedLogin", sessionsController.unprotectedLogin);

/**
 * @swagger
 * /api/sessions/unprotectedCurrent:
 *   get:
 *     summary: Get current user without cookie/session protection
 *     tags: [Sessions]
 *     responses:
 *       200:
 *         description: Simulated unprotected current user
 */
router.get("/unprotectedCurrent", sessionsController.unprotectedCurrent);

export default router;
