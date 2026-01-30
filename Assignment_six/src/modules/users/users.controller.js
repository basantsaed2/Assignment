import { Router } from "express";
import { creatUser, getUserByEmail, getUserById, updateUser } from "./users.services.js";

const usersRouter = Router();

usersRouter.post('/signup', async(req,res)=>{
    const userData = await creatUser(req.body)
    return res.status(userData.status).json(userData)
})

usersRouter.put('/:id', async(req,res)=>{
    const userData = await updateUser(req.body , req.params.id)
    return res.status(userData.status).json(userData)
})

usersRouter.get('/by-email', async(req,res)=>{
    const email = req.query.email;
    if (!email) {
        return res.status(401).json({ message: "Email query is required" });
    }
    const userData = await getUserByEmail(email)
    return res.status(userData.status).json(userData)
})

usersRouter.get('/:id', async(req,res)=>{
    const userData = await getUserById(req.params.id)
    return res.status(userData.status).json(userData)
})

export { usersRouter }