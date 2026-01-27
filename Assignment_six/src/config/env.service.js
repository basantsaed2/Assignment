import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });

let database_name = process.env.DB_NAME;
let database_user = process.env.DB_USER;
let database_password = process.env.DB_PASSWORD;
let database_host = process.env.DB_HOST;
let database_port = process.env.DB_PORT;

export {
  database_name,
  database_user,
  database_password,
  database_host,
  database_port,
};
