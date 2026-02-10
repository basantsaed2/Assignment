import { Router } from "express";
import { createAuthorsCollection } from "./authors.service.js";

const authorsRouter = Router();

authorsRouter.post("/", async(req, res) => {

    const authorsData = await createAuthorsCollection(req.body);
    return res.status(authorsData.status).json(authorsData);
  
});

export { authorsRouter };