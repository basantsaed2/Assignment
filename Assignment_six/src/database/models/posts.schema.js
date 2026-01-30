import { DataTypes , Model } from "sequelize";
import { sequelize } from "../connection.js";

export class Post extends Model {}

Post.init({
   id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: { model: 'users', key: 'id' }
    }
},
{
    sequelize, 
    modelName: 'posts',
    timestamps: true,
    paranoid: true 
})
