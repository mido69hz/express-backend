import express from "express";

const PORT = 3333;

const app = express();

app.use(express.json());

const todos = [
  {
    id: 1,
    title: "Wake up",
    checked: false,
  },
];

app.get("./todos", (req, res) => {
  res.send(todos);
});

app.post("./todos", (req, res) => {
  const title = req.body.title;
  if(!title) return res.status(400).send({message: "title not found"}); 
  const newTodo = {
    id: todos[todos.length - 1].id + 1,
  };
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
