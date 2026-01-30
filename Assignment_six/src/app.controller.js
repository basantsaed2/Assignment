import express from "express";
import { connectToDatabase, databaseSync } from "./database/connection.js";
import { usersRouter } from "./modules/users/users.controller.js";
import { postsRouter } from "./modules/posts/posts.controller.js";

export const bootstrap = () => {
  const app = express();
  app.use(express.json());

  connectToDatabase();
  databaseSync();

  // Import and use routers
  app.use("/users", usersRouter);
  app.use("/posts", postsRouter);

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
