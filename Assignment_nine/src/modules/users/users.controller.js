import { Router } from "express";
import { CreateUser, DeleteUser, Login, UpdateUser, GetUser } from "./users.services.js";
import { auth } from "../../middlewares/authenticated.js";

const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
    const userData = await CreateUser(req.body);
    res.status(userData.status).json(userData);
});

userRouter.post("/login" , async (req, res) => {
    const userData = await Login(req.body);
    res.status(userData.status).json(userData);
});

userRouter.patch("/" , auth , async (req, res) => {
    const userData = await UpdateUser(req.userId, req.body);
    res.status(userData.status).json(userData);
});

userRouter.delete("/" , auth , async (req, res) => {
    const userData = await DeleteUser(req.userId);
    res.status(userData.status).json(userData);
});

userRouter.get("/" , auth , async (req, res) => {
    const userData = await GetUser(req.userId);
    res.status(userData.status).json(userData);
});


export { userRouter };