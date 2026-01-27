import express from 'express';
import { connectToDatabase, databaseSync } from './database/connection.js';


export const bootstrap = () => {
    const app = express();
    app.use(express.json());

    connectToDatabase();
    databaseSync();
    
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}