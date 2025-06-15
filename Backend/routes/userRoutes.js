import express from "express";
import { getUserEmail, getUserUsername } from "../controllers/userController.js";
import authenticateUser from "../middleware/authMiddleware.js"; // <-- Import middleware

const router = express.Router();

// No userId in route; secure it with token middleware
router.get("/email", authenticateUser, getUserEmail);

router.get("/username", authenticateUser, getUserUsername );

export default router;
