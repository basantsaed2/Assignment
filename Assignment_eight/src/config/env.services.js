import dotenv from "dotenv";
import path from "path";
dotenv.config({
  path: path.resolve("./src/config/.env"), // to make it relative for any device
});

export const DB_NAME = process.env.DB_NAME;
export const MONGODB_URI = process.env.MONGODB_URI;
export const PORT = process.env.PORT;

export const FULL_URL = `${MONGODB_URI}/${DB_NAME}`;