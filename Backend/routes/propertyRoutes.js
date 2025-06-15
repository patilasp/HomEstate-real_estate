import express from "express";
import {
  addProperty,
  getUserProperties,
  getCities,
  getCategoriesByCity,
  getSubareasByCityAndCategory,
  getPropertiesBySubarea,
  searchProperties,
  OwnerEmail,
  PropertyDetails,
} from "../controllers/propertyController.js";
import authenticateUser from "../middleware/authMiddleware.js";

const router = express.Router();

// Add a new property (User must be authenticated)
router.post("/add", authenticateUser, addProperty);

// Get properties for a specific user
router.get("/my-properties", authenticateUser, getUserProperties);

// Get all properties (For admin panel)
// router.get("/all", getAllProperties);

//fetching cities from the database
router.get("/cities", getCities);

//fetching category from the cities from database
router.get("/categories/:city", getCategoriesByCity);

//fetching subareas from city and category from the database
router.get("/subareas/:city/:category", getSubareasByCityAndCategory);

//fetching property from subarea
router.get("/list/:city/:category/:subarea", getPropertiesBySubarea);

//search bar
router.get('/search', searchProperties);

//OwnerEmail
router.get('/:id/email',OwnerEmail);

//Property Details
router.get('/:id',PropertyDetails);

export default router;
