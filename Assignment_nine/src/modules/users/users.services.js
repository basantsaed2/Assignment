import { JWT_SECRET } from "../../../config/env.services.js";
import { usersModel } from "../../database/models/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const CreateUser = async (userData) => {
  try {
    const { name, email, password, phone, age } = userData;
    const userExist = await usersModel.findOne({ email });

    if (userExist) {
      return { status: 400, message: "User already exist" };
    }
    const newUser = await usersModel.create({
      name,
      email,
      password,
      phone,
      age,
    });

    const result = newUser.toJSON();
    result.phone = phone;

    return { status: 201, message: "User created successfully", data: result };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

export const Login = async (userData) => {
  try {
    const { email, password } = userData;

    const user = await usersModel.findOne({ email });

    if (!user) {
      return { status: 401, message: "Invalid email or password" };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { status: 401, message: "Invalid email or password" };
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    const result = user.toJSON();
    result.token = token;

    return { status: 200, message: "Login Successfullay", data: result };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

export const UpdateUser = async (userId, userData) => {
  try {
    const { email, password, age, phone, name } = userData;

    if (password) {
      return { status: 400, message: "Password cannot be updated here" };
    }

    if (email) {
      const emailExists = await usersModel.findOne({
        email,
        _id: { $ne: userId },
      });
      if (emailExists) {
        return { status: 409, message: "Email already exists" };
      }
    }

    const updatedUser = await usersModel.findByIdAndUpdate(
      userId,
      { email, name, phone, age },
      { new: true, runValidators: true },
    );

    if (!updatedUser) {
      return { status: 404, message: "User not found" };
    }

    return {
      status: 200,
      message: "User updated successfully",
      data: updatedUser,
    };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

export const DeleteUser = async (userId) => {
  try {
    const deletedUser = await usersModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return { status: 404, message: "User not found" };
    }

    return {
      status: 200,
      message: "User deleted successfully",
    };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

export const GetUser = async (userId) => {
  try {
    const user = await usersModel.findOne({_id : userId});

    if (!user) {
      return { status: 404, message: "User not found" };
    }

    return {
      status: 200,
      data : user
    };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};