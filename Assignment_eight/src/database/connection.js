import { MongoClient } from "mongodb";
import { DB_NAME, FULL_URL } from "../config/env.services.js";

const client = new MongoClient(FULL_URL)
export const db = client.db(DB_NAME);

export const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};