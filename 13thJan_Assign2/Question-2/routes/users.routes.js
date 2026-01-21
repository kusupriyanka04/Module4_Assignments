import express from "express";
import { upload } from "../middleware/upload.middleware.js";
import { uniqueEmail } from "../middleware/uniqueEmail.middleware.js";
import { signupUser } from "../controllers/users.controller.js";

const router = express.Router();

router.post(
  "/signup",
  upload.single("profile"),
  uniqueEmail,
  signupUser
);

export default router;
