import { Router } from "express";

const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
    const userData = await createUser(req.body);
    res.status(userData.status).json(userData);
});

export { userRouter };