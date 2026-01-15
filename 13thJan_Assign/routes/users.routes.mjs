
import { Router } from "express";
import fs from "fs";

const router = Router();

// Helper function — read db.json
const readDB = () => {
  const data = fs.readFileSync("db.json", "utf-8");
  return JSON.parse(data);
};

// Helper function — write db.json
const writeDB = (data) => {
  fs.writeFileSync("db.json", JSON.stringify(data, null, 2));
};

/* --------------------------
   CREATE USER - POST /users/add
--------------------------- */
router.post("/add", (req, res) => {
  const db = readDB();
  const newUser = req.body;

  newUser.id = Date.now(); // simple unique ID
  db.users.push(newUser);
  writeDB(db);

  res.status(201).json({ message: "User added successfully", user: newUser });
});

/* --------------------------
   READ ALL USERS - GET /users
--------------------------- */
router.get("/", (req, res) => {
  const db = readDB();
  res.json(db.users);
});

/* --------------------------
   READ SINGLE USER - GET /users/:userId
--------------------------- */
router.get("/:userId", (req, res) => {
  const db = readDB();
  const user = db.users.find(u => u.id == req.params.userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});

/* --------------------------
   UPDATE USER - PUT /users/update/:userId
--------------------------- */
router.put("/update/:userId", (req, res) => {
  const db = readDB();
  const index = db.users.findIndex(u => u.id == req.params.userId);

  if (index === -1) return res.status(404).json({ message: "User not found" });

  db.users[index] = { ...db.users[index], ...req.body };
  writeDB(db);

  res.json({ message: "User updated successfully", user: db.users[index] });
});

/* --------------------------
   DELETE USER - DELETE /users/delete/:userId
--------------------------- */
router.delete("/delete/:userId", (req, res) => {
  const db = readDB();
  const newUsers = db.users.filter(u => u.id != req.params.userId);

  if (newUsers.length === db.users.length) {
    return res.status(404).json({ message: "User not found" });
  }

  db.users = newUsers;
  writeDB(db);

  res.json({ message: "User deleted successfully" });
});

export default router;
