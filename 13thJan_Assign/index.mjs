import express from "express";
import usersRouter from "./routes/users.routes.mjs";
import todosRouter from "./routes/todos.routes.mjs";

const app = express();
app.use(express.json());

app.use("/users", usersRouter);
app.use("/todos", todosRouter);

app.listen(3000, ()=>{
    console.log("Server is running on http://localhost:3000")
});