import { books } from "../../database/models/books.schema.js";

export const createBooksCollection = async (data) => {
  try {
    const { title, author, genres, year } = data;
    const bookData = await books.insertOne({ title, author, genres, year });
    return {
      status: 200,
      message: "book created sucessfully",
      data: bookData,
    };
  } catch (error) {
    return { status: 400, message: error.message };
  }
};



