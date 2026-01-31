import { Router } from "express";
import { getAllComments } from "./comments.services.js";

const commentsRouter = Router();

commentsRouter.get("/", async (req, res) => {
    const result = await getAllComments();
    res.status(result.status).json(result);

});

export { commentsRouter };