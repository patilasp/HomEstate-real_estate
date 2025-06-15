import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();
const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
//resister - http://localhost:5000/api/auth/register
//login - http://localhost:5000/api/auth/login

app.use("/api/properties", propertyRoutes);
//add property - http://localhost:5000/api/properties/add
//to get the property of a particular user on account page - http://localhost:5000/api/properties/my-properties
//Authorization: Bearer your_jwt_token_here
//Content-Type: application/json
//to show all the data on admin page - http://localhost:5000/api/properties/all
//get all city from database - http://localhost:5000/api/properties/cities
//get all category from the database - http://localhost:5000/api/properties/categories/New York
//get subareas from the database - http://localhost:5000/api/properties/subareas/New York/flat_buy
//fetching property from subarea - http://localhost:5000/api/properties/list/New York/flat_buy/Manhattan
//serach bar - http://localhost:5000/api/properties/search

app.use("/api/user", userRoutes);
//user email - http://localhost:5000/api/user/email
//username - http://localhost:5000/api/user/username

app.use("/api/admin", adminRoutes);
// GET http://localhost:5000/api/admin/properties/pending → for Pending tab
// GET http://localhost:5000/api/admin/properties/approved → for Approved tab
// GET http://localhost:5000/api/admin/properties/reject → for Rejected tab
// PUT http://localhost:5000/api/admin/property/:id/status → to update the status

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
