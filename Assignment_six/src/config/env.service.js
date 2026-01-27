import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });

const database_name = process.env.DB_NAME;
const database_user = process.env.DB_USER;
const database_password = process.env.DB_PASSWORD;
const database_host = process.env.DB_HOST;
const database_port = process.env.DB_PORT;

export {
  database_name,
  database_user,
  database_password,
  database_host,
  database_port,
};
