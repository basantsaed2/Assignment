import { Router } from "express";
import { createBooksCollection, createManyBooksCollection, createTitleIndex, updateBook, findBookByTitle, findBooksByYearRange, findBooksByGenre, findBooksWithSkipLimit, findBooksByYearInteger, findBooksExcludingGenres, deleteBooksBeforeYear, aggregateBooksOne, aggregateBooksTwo, aggregateBooksThree, aggregateBooksFour } from "./books.service.js";

const booksRouter = Router();

booksRouter.post("/", async(req, res) => {

    const booksData = await createBooksCollection(req.body);
    return res.status(booksData.status).json(booksData);
  
});

booksRouter.post("/index", async(req, res) => {

    const indexData = await createTitleIndex();
    return res.status(indexData.status).json(indexData);
});

booksRouter.post("/batch", async(req, res) => {
    const booksData = await createManyBooksCollection(req.body);
    return res.status(booksData.status).json(booksData);    
});

booksRouter.patch("/Future", async(req, res) => {
    const updateData = await updateBook();
    return res.status(updateData.status).json(updateData);    
});

booksRouter.get("/title", async(req, res) => {
    const { title } = req.query;
    const bookData = await findBookByTitle(title);
    return res.status(bookData.status).json(bookData);
});

booksRouter.get("/year", async(req, res) => {
    const { from, to } = req.query;
    const bookData = await findBooksByYearRange(from, to);
    return res.status(bookData.status).json(bookData);
}); 

booksRouter.get("/genre", async(req, res) => {
    const { genre } = req.query;
    const bookData = await findBooksByGenre(genre);
    return res.status(bookData.status).json(bookData);
});

booksRouter.get("/skip-limit", async(req, res) => {
   const booksData = await findBooksWithSkipLimit();
   return res.status(booksData.status).json(booksData);
}); 

booksRouter.get("/year-integer", async(req, res) => {
    const booksData = await findBooksByYearInteger();
    return res.status(booksData.status).json(booksData);
});

booksRouter.get("/exclude-genres", async(req, res) => {
    const booksData = await findBooksExcludingGenres();
    return res.status(booksData.status).json(booksData);
});

booksRouter.delete("/before-year", async(req, res) => {
    const { year } = req.query;
    const deleteBooks = await deleteBooksBeforeYear(year);
    return res.status(deleteBooks.status).json(deleteBooks);
});

booksRouter.get("/aggregate1", async(req, res) => {
    const booksData = await aggregateBooksOne();
    return res.status(booksData.status).json(booksData);
});

booksRouter.get("/aggregate2", async(req, res) => {
    const booksData = await aggregateBooksTwo();
    return res.status(booksData.status).json(booksData);
});

booksRouter.get("/aggregate3", async(req, res) => {
    const booksData = await aggregateBooksThree();
    return res.status(booksData.status).json(booksData);
});

booksRouter.get("/aggregate4", async(req, res) => {
    const booksData = await aggregateBooksFour();
    return res.status(booksData.status).json(booksData);
});

export { booksRouter };