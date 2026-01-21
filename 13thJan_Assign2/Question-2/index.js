import express from "express";
import usersRouter from "./routes/users.routes.js";

const app = express();
app.use(express.json());

app.use("/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
