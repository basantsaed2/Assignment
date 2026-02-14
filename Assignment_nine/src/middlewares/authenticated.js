import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/env.services.js";

export const auth = async (req, res, next) => {
  const token = req.headers.token;
  // const authHeader = req.headers.authorization;
  // const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
