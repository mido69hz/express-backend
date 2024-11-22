import express from "express";
import todoRouter from "./todo-router.js";
import authRouter from "./auth-router.js";



const PORT = 3333;
const app = express();
app.use(express.json());

app.use("/todos", todoRouter);

app.use(authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
