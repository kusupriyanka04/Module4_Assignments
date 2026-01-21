import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import cloudinary from "../config/cloudinary.config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, "../db.json");

export const signupUser = async (req, res) => {
  try {
    // Check if image exists
    if (!req.file) {
      return res.status(400).json({ error: "Profile image is required" });
    }

    const { name, email, password } = req.body;

    // Upload to Cloudinary from buffer
    const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
    const uploadResult = await cloudinary.uploader.upload(base64Image);

    // Read DB
    const data = await fs.readFile(dbPath, "utf-8");
    const db = JSON.parse(data);

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      profilePic: uploadResult.secure_url
    };

    db.users.push(newUser);

    // Write to DB
    await fs.writeFile(dbPath, JSON.stringify(db, null, 2));

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        profilePic: newUser.profilePic
      }
    });
  } catch (err) {
    if (err.message.includes("Only image files")) {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};
