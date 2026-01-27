import { DataTypes , Module } from "sequelize";
import { sequelize } from "../../database/connection";

export class Post extends Module {}

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
    paranoid: true // 1. تفعيل الـ Soft Delete
})
