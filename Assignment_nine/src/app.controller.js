import express from 'express';
import { connectDB } from './database/connection.js';
import { userRouter } from './modules/users/users.controller.js';
import { noteRouter } from './modules/notes/notes.controller.js';
import { PORT } from '../config/env.services.js';

export const bootstrap = async() => {

    const app = express();

    app.use(express.json());

    await connectDB();
    app.use('/users' , userRouter)
    app.use('/notes', noteRouter)

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}