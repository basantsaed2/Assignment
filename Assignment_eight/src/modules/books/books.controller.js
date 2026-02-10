import { Router } from "express";
import { createBooksCollection } from "./books.service.js";

const booksRouter = Router();

booksRouter.post("/", async(req, res) => {

    const booksData = await createBooksCollection(req.body);
    return res.status(booksData.status).json(booksData);
  
});

export { booksRouter };