import e from "express";
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

export const createTitleIndex = async (req, res) => {
  try {
    const result = await books.createIndex({ title: 1 });

    return {
      status: 200,
      message: "Index created successfully",
      indexName: result,
    };
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

export const createManyBooksCollection = async (booksData) => {
  try {
    const result = await books.insertMany(booksData);
    return {
      status: 200,
      message: "Books created successfully",
      data: result,
    };
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

export const updateBook = async () => {
  try {
    const result = await books.updateOne(
      { title: "Future" },
      { $set: { year: 2022 } },
    );
    return {
      status: 200,
      message: "Book year updated successfully",
      data: result,
    };
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

export const findBookByTitle = async (title) => {
  try {
    if (!title) {
      return {
        status: 400,
        message: "Title query parameter is required",
      };
    }
    const book = await books.findOne({ title: title });
    if (book) {
      return {
        status: 200,
        message: "Book found successfully",
        data: book,
      };
    } else {
      return {
        status: 404,
        message: "Book not found",
      };
    }
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

export const findBooksByYearRange = async (from, to) => {
  try {
    if (!from || !to) {
      return {
        status: 400,
        message: "Both 'from' and 'to' query parameters are required",
      };
    }
    const booksInRange = await books
      .find({
        year: { $gte: parseInt(from), $lte: parseInt(to) },
      })
      .toArray();
    return {
      status: 200,
      message: "Books found successfully",
      data: booksInRange,
    };
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

export const findBooksByGenre = async (genre) => {
  try {
    if (!genre) {
      return {
        status: 400,
        message: "Genre query parameter is required",
      };
    }
    const booksByGenre = await books.find({ genres: genre }).toArray();

    //  const booksByGenre = await books.find({
    //   genres: {
    //     $regex: genre,
    //     $options: "i"
    //   }
    // }).toArray();

    return {
      status: 200,
      message: "Books found successfully",
      data: booksByGenre,
    };
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

export const findBooksWithSkipLimit = async (req, res) => {
  try {
    const booksData = await books
      .find({})
      .sort({ year: -1 })
      .skip(2)
      .limit(3)
      .toArray();
    return {
      status: 200,
      message: "Books found successfully",
      data: booksData,
    };
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

export const findBooksByYearInteger = async (req, res) => {
  try {
    const booksData = await books.find({ year: { $type: "int" } }).toArray();
    return {
      status: 200,
      message: "Books found successfully",
      data: booksData,
    };
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

export const findBooksExcludingGenres = async (req, res) => {
  try {
    const excludedGenres = ["Horror", "Science Fiction"];
    const booksData = await books
      .find({ genres: { $nin: excludedGenres } })
      .toArray();
    return {
      status: 200,
      message: "Books found successfully",
      data: booksData,
    };
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

export const deleteBooksBeforeYear = async (year) => {
  try {
    if (!year) {
      return {
        status: 400,
        message: "Year query parameter is required",
      };
    }
    const result = await books.deleteMany({ year: { $lt: parseInt(year) } });
    return {
      status: 200,
      message: `${result.deletedCount} books deleted successfully`,
    };
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

export const aggregateBooksOne = async (req, res) => {
  try {
    const booksData = await books
      .aggregate([{ $match: { year: { $gt: 2000 } } }, { $sort: { year: -1 } }])
      .toArray();
    return {
      status: 200,
      message: "Books found successfully",
      data: booksData,
    };
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

export const aggregateBooksTwo = async (req, res) => {
  try {
    const booksData = await books
      .aggregate([
        { $match: { year: { $gt: 2000 } } },
        { $project: { _id: 0, title: 1, author: 1, year: 1 } },
      ])
      .toArray();
    return {
      status: 200,
      message: "Books found successfully",
      data: booksData,
    };
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

export const aggregateBooksThree = async (req, res) => {
  try {
    const booksData = await books.aggregate([{ $unwind: "$genres" }]).toArray();
    return {
      status: 200,
      message: "Books found successfully",
      data: booksData,
    };
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

export const aggregateBooksFour = async (req, res) => {
  try {
    const booksData = await books
      .aggregate([
        {
          $lookup: {
            from: "logs",
            localField: "_id",
            foreignField: "book_id",
            as: "book_details",
          },
        },
      ])
      .toArray();
    return {
      status: 200,
      message: "Books and logs joined successfully",
      data: booksData,
    };
  } catch (error) {
    return { status: 400, message: error.message };
  }
};
