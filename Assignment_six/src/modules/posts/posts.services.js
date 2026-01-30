import { Post } from "../../database/models/posts.schema.js";
import { User } from "../../database/models/users.schema.js";

const createPost = async (data) => {
  try {
    const { title, content, userId } = data;

    if (!title) {
      return { status: 400, message: "title is required" };
    }

    const postData = Post.build({ title, content, userId });
    await postData.save();

    return {
      status: 201,
      message: "post created successfully",
      post: postData,
    };
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

const deletePost = async (userId, postId) => {
  try {
    const deletedCount = await Post.destroy({
      where: { id: postId, userId: userId },
    });

    if (deletedCount === 0) {
      return {
        status: 403,
        message: "You are not the owner or post doesn't exist",
      };
    }
    return { status: 201, message: "post deleted successfully" };
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

const getAllPosts = async () => {
  try {
    const posts = await Post.findAll();
    return { status: 200, posts : posts };
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

const getPostsWithDetails = async () => {
  try {
    const posts = await Post.findAll({
     attributes : ["id" , "title"],
      include: [
        { model: User , attributes : ["id" , "name"]},
        { model: Comment , attributes : ["id" , "content"]}
      ]
    });
    return { status: 200, posts : posts };
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

export { createPost, deletePost, getAllPosts , getPostsWithDetails};
