import { Op } from "sequelize";
import { Comment } from "../../database/models/comments.schema.js";
import { User } from "../../database/models/users.schema.js";
import { Post } from "../../database/models/posts.schema.js";

const getAllComments = async () => {
  try {
    const comments = await Comment.findAll();
    return { status: 200, comments: comments };
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

const createBulkComment = async (data) => {
  try {
    const commentBulk = await Comment.bulkCreate(data);
    return {
      status: 200,
      message: "comments created successfully",
      comments: commentBulk,
    };
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

const updateComment = async (id, data) => {
  try {
    const { content, userId } = data;
    const commentData = await Comment.findByPk(id);

    if (!commentData) {
      return { status: 404, message: "Comment not found" };
    }

    const [update] = await Comment.update(
      { content },
      { where: { id, userId } },
    );

    if (update === 0) {
      return {
        status: 403,
        message: "You are not authorized to update this comment",
      };
    }
    return {
      status: 200,
      message: "comments updated successfully",
    };
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

const findOrCreateComment = async (data) => {
  try {
    const { content, userId, postId } = data;
    const [comment, created] = await Comment.findOrCreate({
      where: { content, userId, postId },
      defaults: { content, userId, postId },
    });

    return {
      status: created ? 201 : 200,
      message: created
        ? "Comment created successfully"
        : "Comment already exists",
      comment: comment,
      created: created,
    };
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

const searchComments = async (word) => {
  try {
    const { count, rows: comments } = await Comment.findAndCountAll({
      where: {
        content: {
          [Op.like]: `%${word}%`,
        },
      },
    });
    return { status: 200, count: count, comments: comments };
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

const getRecentComments = async (postId) => {
  try {
    const comments = await Comment.findAll({
      where: { postId },
      order: [["createdAt", "DESC"]],
      limit: 3,
    });

    return { status: 200, comments };
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

const getCommentWithDetails = async (id) => {
  try {
    const comment = await Comment.findByPk(id, {
      attributes: ["id", "content"],
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"],
        },
        {
          model: Post,
          attributes: ["id", "title", "content"],
        },
      ],
    });

    if (!comment) {
      return { status: 404, message: "Comment not found" };
    }

    return { status: 200, comment };
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

export {
  getAllComments,
  createBulkComment,
  updateComment,
  findOrCreateComment,
  searchComments,
  getRecentComments,
  getCommentWithDetails,
};
