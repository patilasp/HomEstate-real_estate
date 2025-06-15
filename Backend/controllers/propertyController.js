import pool from "../config/db.js";


export const addProperty = async (req, res) => {
  const {
    property_name,
    address,
    features,
    price,
    category,
    city,
    subarea,
    images_link,
    owner_name,
    owner_contact,
    upi_id,
    account_name,
    bank_name,
    ifsc_code,
    qr_code_link, // ✅ new field
  } = req.body;

  const user_id = req.user.id;

  if (
    !Array.isArray(images_link) ||
    images_link.length < 1 ||
    images_link.length > 3
  ) {
    return res.status(400).json({ message: "You must provide 1 to 3 images." });
  }

  try {
    await pool.query(
      `INSERT INTO Properties 
        (user_id, property_name, address, features, price, category, city, subarea, images_link, status, owner_name, owner_contact, upi_id, account_name, bank_name, ifsc_code, qr_code)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user_id,
        property_name,
        address,
        features,
        price,
        category,
        city,
        subarea,
        JSON.stringify(images_link),
        "pending", // default status
        owner_name,
        owner_contact,
        upi_id,
        account_name,
        bank_name,
        ifsc_code,
        qr_code, 
      ]
    );

    res.status(201).json({ message: "Property submitted for approval." });
  } catch (error) {
    console.error("Error inserting property:", error);
    res.status(500).json({ message: "Server error" });
  }
};


//Get all properties for a specific user
export const getUserProperties = async (req, res) => {
  const userId = req.user.id; // Assuming `authenticateToken` adds `req.user`

  try {
    const [rows] = await pool.query(
      'SELECT * FROM properties WHERE user_id = ?',
      [userId]
    );

    res.json(rows); // rows contain all properties with status: 'approved', 'pending', 'reject'
  } catch (error) {
    console.error('Error fetching user properties:', error);
    res.status(500).json({ message: 'Server error fetching properties' });
  }
};




//fetching cities from the database
export const getCities = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT DISTINCT city FROM properties");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching cities:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Fetch all categories based on selected city
export const getCategoriesByCity = async (req, res) => {
  const { city } = req.params;

  try {
    const [rows] = await pool.query(
      "SELECT DISTINCT category FROM properties WHERE city = ? AND status = 'approved'",
      [city]
    );

    res.json(rows);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


//fetching subarea
export const getSubareasByCityAndCategory = async (req, res) => {
  const { city, category } = req.params;

  try {
    const [rows] = await pool.query(
      "SELECT DISTINCT subarea FROM properties WHERE city = ? AND category = ?",
      [city, category]
    );

    res.json(rows);
  } catch (error) {
    console.error("Error fetching subareas:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//fetch property according to city, category, subarea
export const getPropertiesBySubarea = async (req, res) => {
  const { city, category, subarea } = req.params;

  try {
    const [rows] = await pool.query(
      `SELECT * FROM properties 
       WHERE city = ? AND category = ? AND subarea = ? AND status = 'approved'`,
      [city, category, subarea]
    );

    res.json(rows);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


//search property
// controllers/propertyController.js

export const searchProperties = async (req, res) => {
  const { city, minPrice, maxPrice, category } = req.query; // ✅ use req.query

  try {
    let query = "SELECT * FROM properties WHERE status = 'approved'";
    const values = [];

    if (city) {
      query += " AND city = ?";
      values.push(city);
    }

    if (minPrice) {
      query += " AND price >= ?";
      values.push(minPrice);
    }

    if (maxPrice) {
      query += " AND price <= ?";
      values.push(maxPrice);
    }

    if (category) {
      query += " AND category = ?";
      values.push(category);
    }

    const [results] = await pool.query(query, values);
    res.json(results);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//owner email
export const  OwnerEmail = async (req, res) => {
  const propertyId = req.params.id;

  try {
    const [propertyRows] = await pool.query(
      "SELECT user_id FROM properties WHERE id = ?",
      [propertyId]
    );

    if (propertyRows.length === 0) {
      return res.status(404).json({ message: "Property not found" });
    }

    const userId = propertyRows[0].user_id;

    const [userRows] = await pool.query(
      "SELECT email FROM users WHERE id = ?",
      [userId]
    );

    if (userRows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ email: userRows[0].email });
  } catch (error) {
    console.error("Error fetching user email:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//property details
export const PropertyDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query("SELECT * FROM properties WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json(rows[0]); // Return the property
  } catch (err) {
    console.error("Error fetching property by ID:", err);
    res.status(500).json({ message: "Server error" });
  }
};