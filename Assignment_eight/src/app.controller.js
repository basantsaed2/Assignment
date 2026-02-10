import express from "express";
import { PORT } from "./config/env.services.js";
import { connectToDatabase } from "./database/connection.js";
import { booksRouter } from "./modules/books/books.controller.js";
import { authorsRouter } from "./modules/authors/authors.controller.js";
import { logsRouter } from "./modules/logs/logs.controller.js";

export const bootstrap = async () => {
  const app = express();
  app.use(express.json());

  await connectToDatabase();

  app.use("/books", booksRouter);
  app.use("/authors", authorsRouter);
  app.use("/logs", logsRouter);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
