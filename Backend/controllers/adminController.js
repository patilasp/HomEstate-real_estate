import db from "../config/db.js";

// Get properties by status (pending, approved, rejected)
export const getPropertiesByStatus = async (req, res) => {
  const { status } = req.params;

  if (!["pending", "approved", "reject"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const [results] = await db.query(
      "SELECT * FROM properties WHERE status = ?",
      [status]
    );
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: "Error fetching properties", error: err });
  }
};

// Update property status (approve/reject)
export const updatePropertyStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["approved", "reject"].includes(status)) {
    return res.status(400).json({ message: "Invalid status update" });
  }

  try {
    const [result] = await db.query(
      "UPDATE properties SET status = ? WHERE id = ?",
      [status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json({ message: `Property status updated to ${status}` });
  } catch (err) {
    res.status(500).json({ message: "Error updating status", error: err });
  }
};


