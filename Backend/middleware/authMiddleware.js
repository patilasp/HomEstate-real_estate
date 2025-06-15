import jwt from "jsonwebtoken";
import pool from "../config/db.js";

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const [user] = await pool.query(
      "SELECT id, username, email, is_admin FROM users WHERE id = ?",
      [decoded.userId]
    );

    if (user.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user[0]; // { id, username, email, id_admin }
    next();
  } catch (error) {
    console.error("JWT Error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authenticateUser;
