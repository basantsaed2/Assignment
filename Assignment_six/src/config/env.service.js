import dotenv from "dotenv";
import path from "path";
dotenv.config({
  path: path.resolve("./src/config/.env"), // to make it relative for any device
});

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

// export default {
//   db: {
//     name: process.env.DB_NAME,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     host: process.env.DB_HOST,
//   },
//   port: process.env.DB_PORT,
// };
