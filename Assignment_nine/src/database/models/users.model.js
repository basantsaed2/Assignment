import mongoose from "mongoose";
import { ENC_KEY, SIG_KEY } from "../../../config/env.services.js";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  age: { type: Number, min: 18, max: 60, required: true },
});

userSchema.plugin(encrypt, {
  encryptionKey: ENC_KEY,
  signingKey: SIG_KEY,
  encryptedFields: ['phone'],
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

export const usersModel = mongoose.model("users", userSchema);
