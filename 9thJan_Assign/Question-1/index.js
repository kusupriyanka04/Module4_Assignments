import express from "express";
import fs from "fs";

const app = express();
const PORT = 3000;

// Middleware to read JSON body
app.use(express.json());

// Function to read db.json file
function readDB() {
  const data = fs.readFileSync("db.json", "utf-8");
  return JSON.parse(data);
}

// Function to write data into db.json
function writeDB(data) {
  fs.writeFileSync("db.json", JSON.stringify(data, null, 2));
}

// 1️⃣ GET: Fetch all students
app.get("/students", (req, res) => {
  const students = readDB();
  res.json(students);
});

// 2️⃣ POST: Add new student
app.post("/students", (req, res) => {
  const students = readDB();
  const newStudent = req.body;

  // Create unique ID
  newStudent.id = Date.now();

  students.push(newStudent);
  writeDB(students);

  res.json({ message: "Student added successfully", student: newStudent });
});

// 3️⃣ PUT: Update student by id
app.put("/students", (req, res) => {
  const { id, ...updates } = req.body;
  const students = readDB();

  const index = students.findIndex(stu => stu.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Student not found!" });
  }

  // Update fields
  students[index] = { ...students[index], ...updates };
  writeDB(students);

  res.json({ message: "Student updated successfully", student: students[index] });
});

// 4️⃣ DELETE: Delete by id
app.delete("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const students = readDB();

  const filtered = students.filter(stu => stu.id !== id);

  if (filtered.length === students.length) {
    return res.status(404).json({ message: "Student not found!" });
  }

  writeDB(filtered);

  res.json({ message: "Student deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
