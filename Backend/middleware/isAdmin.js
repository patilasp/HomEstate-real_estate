const is_admin = (req, res, next) => {
  if (req.user && req.user.is_admin === 1) {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admins only." });
  }
};
export default is_admin;
