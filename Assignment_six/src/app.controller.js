import express from "express";
import { connectToDatabase, databaseSync } from "./database/connection.js";
import { usersRouter } from "./modules/users/users.controller.js";
import { postsRouter } from "./modules/posts/posts.controller.js";
import { commentsRouter } from "./modules/comments/comments.controller.js";

export const bootstrap = () => {
  const app = express();
  app.use(express.json());

  connectToDatabase();
  databaseSync();

  // Import and use routers
  app.use("/users", usersRouter);
  app.use("/posts", postsRouter);
  app.use("/comments", commentsRouter)

  app.use((err, req, res, next) => {
    res
      .status(500)
      .json({ message: "Something went wrong!", error: err.message });
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
