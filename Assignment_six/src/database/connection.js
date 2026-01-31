import { Sequelize } from 'sequelize';
import mysql from "mysql2/promise";
import { database_name , database_password , database_user , database_host } from '../config/env.service.js';

export const sequelize = new Sequelize(database_name, database_user, database_password, {
    host: database_host,
    dialect: 'mysql',
    logging: false,
});


export const connectToDatabase = async () => {
    try {

        //1. Create connection to MySQL server (without specifying a DB)  
        const connection = await mysql.createConnection({
            host: database_host,
            user: database_user,
            password: database_password,
        });

        //2. Run the Create Database query
        await connection.query(`create database if not exists \`${database_name}\`;`);
        await connection.end();

        //3. Now connect to the created database using Sequelize
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

export const databaseSync = async () => {
  try {
    // This will create the tables based on your models
    await sequelize.sync();
    console.log("Models synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing models:", error);
  }
};