import express from "express";
import { validateUser } from "../middleware/validateUser.js";
import { createUser, getUsers, getUserById, updateUser, deleteUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", validateUser, createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
