import express from "express";
import { getPropertiesByStatus, updatePropertyStatus } from "../controllers/adminController.js";;
import  authenticateUser  from "../middleware/authMiddleware.js";
import  is_admin  from "../middleware/isAdmin.js";

const router = express.Router();

// Get properties by status (pending, approved, reject)
router.get(
  "/properties/:status",
  authenticateUser,
  is_admin,
  getPropertiesByStatus
);

// Update property status (approve/reject)
router.put(
  "/property/:id/status",
  authenticateUser,
  is_admin,
  updatePropertyStatus
);


export default router;
