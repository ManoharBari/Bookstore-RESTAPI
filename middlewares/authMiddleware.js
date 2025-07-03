const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET || "secret123";

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Token missing" });

  try {
    const user = jwt.verify(token, SECRET);
    req.user = user;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};
