import mongoose from "mongoose";
import { FULL_URL } from "../../config/env.services.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(FULL_URL);
    console.log("connected to database");
  } catch (error) {
    console.log("error connected", error.message);
  }
};
