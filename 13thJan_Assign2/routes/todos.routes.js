import { Router } from "express";
import fs from "fs";
import { rateLimiter } from "../middleware/rateLimiter.middleware.mjs";
import { validateTodo } from "../middleware/validateTodo.middleware.mjs";

const router = Router();
const dbFile = "src/db.json";

// Helper to read db.json
const readDB = () => JSON.parse(fs.readFileSync(dbFile, "utf-8"));

// Helper to write db.json
const writeDB = (data) => fs.writeFileSync(dbFile, JSON.stringify(data, null, 2));

// ✅ POST /todos/add
router.post("/add", validateTodo, (req, res) => {
  const db = readDB();
  const newTodo = { ...req.body, id: Date.now() };
  db.todos.push(newTodo);
  writeDB(db);
  res.status(201).json({ message: "Todo added", todo: newTodo });
});

// ✅ GET /todos (Rate limited)
router.get("/", rateLimiter, (req, res) => {
  const db = readDB();
  res.json(db.todos);
});

// ✅ GET /todos/:todoId
router.get("/:todoId", (req, res) => {
  const db = readDB();
  const todo = db.todos.find(t => t.id == req.params.todoId);
  if (!todo) return res.status(404).json({ error: "Todo not found" });
  res.json(todo);
});

// ✅ PUT /todos/update/:todoId
router.put("/update/:todoId", (req, res) => {
  const db = readDB();
  const index = db.todos.findIndex(t => t.id == req.params.todoId);
  if (index === -1) return res.status(404).json({ error: "Todo not found" });

  db.todos[index] = { ...db.todos[index], ...req.body };
  writeDB(db);
  res.json({ message: "Todo updated", todo: db.todos[index] });
});

// ✅ DELETE /todos/delete/:todoId
router.delete("/delete/:todoId", (req, res) => {
  const db = readDB();
  const filtered = db.todos.filter(t => t.id != req.params.todoId);

  if (filtered.length === db.todos.length) return res.status(404).json({ error: "Todo not found" });

  db.todos = filtered;
  writeDB(db);
  res.json({ message: "Todo deleted" });
});

export default router;
