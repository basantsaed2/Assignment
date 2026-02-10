import { db } from "../../database/connection.js";

export const createCappedLog = async () => {
    try {
        await db.createCollection("logs", { 
            capped: true, 
            size: 1024 * 1024 
        });

       return { status: 200, message: "logs created successfully" };
    } catch (error) {
    return { status: 400, message: error.message };
    }
};

export const insertLog = async (logData) => {
    try {
        const logsCollection = db.collection("logs");
        const result = await logsCollection.insertOne(logData);
        return {
            status: 200,
            message: "Log inserted successfully",
            data: result,
        };
    } catch (error) {
        return { status: 400, message: error.message };
    }
}
