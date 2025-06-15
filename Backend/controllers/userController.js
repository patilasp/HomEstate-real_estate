// Get the authenticated user's email
export const getUserEmail = async (req, res) => {
  try {
    const user = req.user;

    res.json({
      email: user.email,
    });
  } catch (error) {
    console.error("Error fetching user email:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get the authenticated user's name
export const getUserUsername = async (req, res) => {
  try {
    const user = req.user;

    res.json({
      username: user.username,
    });
  } catch (error) {
    console.error("Error fetching username:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
