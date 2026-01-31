import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection.js";

export class Comment extends Model {}

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
    paranoid: true, 
  },
);
