import { Router } from "express";
import { createUser, Login } from "./users.services.js";

const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
    const userData = await createUser(req.body);
    res.status(userData.status).json(userData);
});

userRouter.post("/login" ,async (req, res) => {
    const userData = await Login(req.body);
    res.status(userData.status).json(userData);
});

export { userRouter };