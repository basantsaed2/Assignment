import { Router } from "express";
import { createCappedLog, insertLog } from "./logs.services.js";

const logsRouter = Router();

logsRouter.post("/capped", async(req, res) => {
    const logsData = await createCappedLog();
    return res.status(logsData.status).json(logsData);
  
});

logsRouter.post("/", async(req, res) => {
    const logData = await insertLog(req.body);
    return res.status(logData.status).json(logData);
});

export { logsRouter };