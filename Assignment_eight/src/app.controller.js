import express from "express";
import { PORT } from "./config/env.services.js";
import { connectToDatabase } from "./database/connection.js";

export const bootstrap = async () => {
  const app = express();
  app.use(express.json());

  await connectToDatabase();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
