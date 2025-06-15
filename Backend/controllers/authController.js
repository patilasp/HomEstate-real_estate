import bcrypt from 'bcryptjs';
import pool from '../config/db.js';
import jwt from "jsonwebtoken";

// const generateToken = (userId) => {
//   return jwt.sign({ userId }, process.env.JWT_SECRET, {
//     expiresIn: "1d",
//   });
// };

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// ✅ Register User
export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user exists
        const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user
        await pool.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', 
            [username, email, hashedPassword]);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error in register' });
    }
};

// ✅ Login User

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [user] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

    if (user.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user[0].password);

    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user[0].id);

    // Return token and user info (not password)
    res.json({
      token,
       user: {
        id: user[0].id,
        username: user[0].username,
        email: user[0].email,
        is_admin: user[0].is_admin
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error1' });
  }
};


