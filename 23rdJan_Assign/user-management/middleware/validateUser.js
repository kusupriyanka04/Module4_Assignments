import validator from "validator";

export const validateUser = (req, res, next) => {
  const { name, email, password, age } = req.body;

  if (!name) return res.status(400).json({ error: "Name is required" });
  if (!email || !validator.isEmail(email))
    return res.status(400).json({ error: "Valid email is required" });
  if (!password || password.length < 8)
    return res.status(400).json({ error: "Password must be at least 8 characters" });

  if (age && (isNaN(age) || age < 18))
    return res.status(400).json({ error: "Age must be a number >= 18" });

  next();
};
