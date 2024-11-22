import express from "express";
import * as fs from "fs";
import { nanoid } from "nanoid";
import bcrypt from "bcrypt";

const router = express.Router();

// Signup route
router.post("/Signup", async (req, res) => {
  const { name, email, password } = req.body;
  const users = JSON.parse(fs.readFileSync("./users.json", "utf-8"));
  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    return res.status(400).send({ message: "User already registered" });
  }

  // Hash the password
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: nanoid(),
      name: name,
      email: email,
      password: hashedPassword,
    };

    // Save the new user to the users.json file
    users.push(newUser);
    fs.writeFileSync("./users.json", JSON.stringify(users, null, 2), "utf-8");
    return res.status(201).json({ message: "New user created" });
  } catch (err) {
    return res.status(500).send({ message: "Error hashing password" });
  }
});

// Login route
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const users = JSON.parse(fs.readFileSync("./users.json", "utf-8"));
  const existingUser = users.find((user) => user.email === email);

  if (!existingUser) {
    return res.status(400).send({ message: "Email not found" });
  }

  // Compare the hashed password with the provided one
  bcrypt.compare(password, existingUser.password, (err, result) => {
    if (err) {
      return res.status(500).send({ message: "Error comparing password" });
    }
    if (!result) {
      return res.status(400).send({ message: "Incorrect password" });
    }
    return res.status(200).send({ message: "Login successful" });
  });
});

export default router;
