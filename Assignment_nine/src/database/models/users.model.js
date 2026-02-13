import mongoose from "mongoose";
import bcrypt from "bcrypt";
import mongooseFieldEncryption from "mongoose-field-encryption";
import { ENC_KEY, SIG_KEY } from "../../../config/env.services.js";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  age: { type: Number, min: 18, max: 60, required: true },
});

userSchema.plugin(mongooseFieldEncryption.fieldEncryption, {
  fields: ["phone"],
  secret: ENC_KEY,
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (err) {
    throw err;
  }
});

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.__v;
    delete ret.__enc_phone;
    return ret;
  }
});

export const usersModel = mongoose.model("users", userSchema);

