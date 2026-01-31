import { Post } from "../models/posts.schema.js";
import { User } from "../models/users.schema.js";
import { Comment } from "../models/comments.schema.js";

User.hasMany(Post, {
  foreignKey: "userId",
});

Post.belongsTo(User, {
  foreignKey: "userId",
});

Post.hasMany(Comment, {
  foreignKey: "postId",
});

Comment.belongsTo(Post, {
  foreignKey: "postId",
});

User.hasMany(Comment, { 
    foreignKey: "userId" 
});
Comment.belongsTo(User, { 
    foreignKey: "userId"
 });
