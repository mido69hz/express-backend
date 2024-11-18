import express from "express";
import * as fs from "fs";
import { nanoid } from "nanoid";
import bcrypt from "bcrypt";

const PORT = 3333;
const app = express();
app.use(express.json());

let todos = [];

app.get("/todos", (req, res) => {
  res.send(todos);
});

app.post("/todos", (req, res) => {
  const title = req.body.title;
  if (!title) return res.status(400).send({ message: "title is not found" });
  const newTodo = {
    id: nanoid(),
    title: title,
    checked: false,
  };
  todos.push(newTodo);
  fs.writeFileSync("./data.json", JSON.stringify(todos), "utf-8");
  return res.send(newTodo);
});

// http://localhost:3333/todos/1

app.get("/todos/:id", (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).send({ message: "Id not found!" });
  const todo = todos.find((item) => item.id === Number(id));
  if (!todo) return res.status(404).send({ message: "Todo not found!" });
  return res.send(todo);
});

app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;

  if (!id) return res.status(400).send({ message: "Id not found!" });

  const todoIndex = todos.findIndex((item) => item.id === Number(id));
  if (todoIndex === -1) {
    return res.status(404).send({ message: "Todo not found!" });
  }
  todos.splice(todoIndex, 1);
  fs.writeFileSync("./data.json", JSON.stringify(todos), "utf-8");
  return res.send({ message: "Todo deleted successfully!" });
});

app.put("/todos/:id", (req, res) => {
  const title = req.params.title;
  const updatedData = req.body;
  console.log(updatedData);
  if (!id) return res.status(400).send({ message: "Id not found!" });
  const todoIndex = todos.find((item) => item.id === Number(id));
  if (todoIndex === -1) {
    return res.status(404).send({ message: "Todo not found!" });
  }

  fs.writeFileSync("./data.json", JSON.stringify(todos), "utf-8");
  return res.send({ message: "Todo updated!!!" });
});

app.post("/Signup", (req, res) => {
  const { name, email, password } = req.body;
  const users = JSON.parse(fs.readFileSync("./users.json", "utf-8"));
  const existingUser = users.find((user) => user.email === email);
  if (existingUser)
    return res.status(400).send({ message: "user already registered" });

  bcrypt.hash(password, 10, function (err, hash) {
    console.log({ hash, err });
    hashedPassword = hash;
  });
  const newUsers = {
    id: nanoid(),
    name: name,
    email: email,
    password: password,
  };
  fs.writeFileSync(
    "./users.json",
    JSON.stringify([...users, newUsers]),
    "utf-8"
  );
  return res.status(200).json({ message: "New user created" });
});

app.post("/login", (req, res) => {
  const { name, email, password } = req.body;
  const users = JSON.parse(fs.readFileSync("./users.json", "utf-8"));
  const existingUser = users.find((user) => user.email === email);
  const existingPassword = users.find((user) => user.password === password);
  const newUsers = {
    id: nanoid(),
    email: email,
    password: password,
  };
  if (!existingUser) {
    return res.status(200).send({ message: "email taarahgui bna" });
  }
  if (!existingPassword) {
    return res.status(200).send({ message: "password taarahgui bna" });
  }
  if (existingPassword || existingUser) {
    return res.status(200).send({ message: "amjilttai newterlee" });
  }
  fs.writeFileSync(
    "./users.json",
    JSON.stringify([...users, newUsers]),
    "utf-8"
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  const data = fs.readFileSync("./data.json", "utf-8");
  todos = JSON.parse(data);
});
