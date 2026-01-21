import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, "../db.json");

export const uniqueEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const data = await fs.readFile(dbPath, "utf-8");
    const db = JSON.parse(data);

    if (db.users.some(user => user.email === email)) {
      return res.status(409).json({ error: "Email already exists" });
    }

    next();
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
