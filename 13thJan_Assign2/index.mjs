import express from "express";
import todosRouter from "./routes/todos.routes.js";
import { loggerMiddleware } from "./middleware/logger.middleware.mjs";
//import { loggerMiddleware } from "./middleware/logger.middleware.js";
//import { rateLimiter } from "./middleware/rateLimiter.middleware.js";
//import { validateTodo } from "./middleware/validateTodo.middleware.js";


const app = express();
app.use(express.json()); // JSON body parser

// App-level middleware
app.use(loggerMiddleware);

// Todo routes
app.use("/todos", todosRouter);

// Start server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
