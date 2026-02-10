import { authors } from "../../database/models/authors.schema.js";

export const createAuthorsCollection = async (data) => {
  try {
    const { name, nationality } = data;
    const authorData = await authors.insertOne({ name, nationality });
    return {
      status: 200,
      message: "author created sucessfully",
      data: authorData,
    };
  } catch (error) {
    return { status: 400, message: error.message };
  }
};



