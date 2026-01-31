import { Router } from "express";
import { getAllComments, createBulkComment , updateComment , findOrCreateComment , searchComments , getRecentComments , getCommentWithDetails} from "./comments.services.js";

const commentsRouter = Router();

commentsRouter.get("/", async (req, res) => {
  const commentData = await getAllComments();
  return res.status(commentData.status).json(commentData);
});

commentsRouter.post("/", async (req, res) => {
  const data = req.body;
  if (!Array.isArray(data)) {
    return res.json({
      status: 400,
      message: "Data must be an array of comments",
    });
  }
  const commentData = await createBulkComment(data);
  return res.status(commentData.status).json(commentData);
});

commentsRouter.patch("/:id", async (req, res) => {
  const commentData = await updateComment(req.params.id, req.body);
  return res.status(commentData.status).json(commentData);
});

commentsRouter.post("/find-or-create", async (req, res) => {
  const commentData = await findOrCreateComment(req.body);
  return res.status(commentData.status).json(commentData);
});

commentsRouter.get("/search", async (req, res) => {
   const {word} = req.query;
   if (!word) {
    return res.json({
      status: 400,
        message: "word query parameter is required",
    });
  }
  const commentData = await searchComments(word);
  return res.status(commentData.status).json(commentData);
});

commentsRouter.get("/:postId", async (req, res) => {
  const { postId } = req.params;
  const commentData = await getRecentComments(postId);
  return res.status(commentData.status).json(commentData);
});

commentsRouter.get("/details/:id", async (req, res) => {
  const { id } = req.params;
  const commentData = await getCommentWithDetails(id);
  return res.status(commentData.status).json(commentData);
});

export { commentsRouter };
