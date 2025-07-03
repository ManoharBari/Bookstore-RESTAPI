const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getUsers, saveUsers } = require("../models/userModel");
const SECRET = process.env.JWT_SECRET || "secret123";

exports.register = async (req, res) => {
  const { email, password } = req.body;
  const users = await getUsers();
  if (users.find((u) => u.email === email))
    return res.status(400).json({ error: "User exists" });

  const hashed = await bcrypt.hash(password, 10);
  users.push({ id: Date.now().toString(), email, password: hashed });
  await saveUsers(users);

  res.status(201).json({ message: "User registered" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const users = await getUsers();
  const user = users.find((u) => u.email === email);

  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
};
