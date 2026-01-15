
import { Router } from "express";
import fs from "fs";

const router = Router();

const readDB = () => {
  const data = fs.readFileSync("db.json", "utf-8");
  return JSON.parse(data);
};

const writeDB = (data) => {
  fs.writeFileSync("db.json", JSON.stringify(data, null, 2));
};

/* CREATE TODO - POST /todos/add */
// router.post("/add", (req, res) => {
//   const db = readDB();
//   const newTodo = req.body;
//   newTodo.id = Date.now();
//   db.todos.push(newTodo);
//   writeDB(db);
//   res.status(201).json({ message: "Todo added", todo: newTodo });
// });

router.post("/add", (req, res) => {
  const db = readDB();
  const newTodo = req.body;

  if (!newTodo || !newTodo.task || !newTodo.status) {
    return res.status(400).json({ message: "Task and status required" });
  }

  newTodo.id = Date.now(); // unique id
  db.todos.push(newTodo);
  writeDB(db);

  res.status(201).json({ message: "Todo added", todo: newTodo });
});


/* READ ALL TODOS - GET /todos */
router.get("/", (req, res) => {
  const db = readDB();
  res.json(db.todos);
});

/* READ SINGLE TODO - GET /todos/:todoId */
router.get("/:todoId", (req, res) => {
  const db = readDB();
  const todo = db.todos.find(t => t.id == req.params.todoId);
  if (!todo) return res.status(404).json({ message: "Todo not found" });
  res.json(todo);
});

/* UPDATE TODO - PUT /todos/update/:todoId */
router.put("/update/:todoId", (req, res) => {
  const db = readDB();
  const index = db.todos.findIndex(t => t.id == req.params.todoId);
  if (index === -1) return res.status(404).json({ message: "Todo not found" });

  db.todos[index] = { ...db.todos[index], ...req.body };
  writeDB(db);

  res.json({ message: "Todo Updated", todo: db.todos[index] });
});

/* DELETE TODO - DELETE /todos/delete/:todoId */
router.delete("/delete/:todoId", (req, res) => {
  const db = readDB();
  const newTodos = db.todos.filter(t => t.id != req.params.todoId);
  if (newTodos.length === db.todos.length) {
    return res.status(404).json({ message: "Todo not found" });
  }
  db.todos = newTodos;
  writeDB(db);
  res.json({ message: "Todo Deleted" });
});

export default router;
