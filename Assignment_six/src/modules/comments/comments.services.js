import { Comment } from "../../database/models/comments.schema.js";

const getAllComments = async () => {
    try {
        const comments = await Comment.findAll();
        return { status: 200, comments: comments };
    } catch (error) {
        return { status: 400, message: error.message };
    }
};

export { getAllComments };