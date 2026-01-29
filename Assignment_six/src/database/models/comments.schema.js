import { DataTypes, Module } from "sequelize";
import { sequelize } from "../connection";

export class Comment extends Module {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: { model: "users", key: "id" },
    },
    postId: {
      type: DataTypes.INTEGER,
      references: { model: "posts", key: "id" },
    },
  },
  {
    sequelize,
    modelName: "comments",
    timestamps: true,
    paranoid: true, // 1. تفعيل الـ Soft Delete
  },
);
