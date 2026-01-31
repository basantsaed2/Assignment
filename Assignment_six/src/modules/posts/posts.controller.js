import { Router } from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostsWithDetails,
  getPostsCommentsCount,
} from "./posts.services.js";

const postsRouter = Router();

postsRouter.get("/", async (req, res) => {
  const postData = await getAllPosts();
  return res.status(postData.status).json(postData);
});

postsRouter.post("/", async (req, res) => {
  const postData = await createPost(req.body);
  return res.status(postData.status).json(postData);
});

postsRouter.delete("/:id", async (req, res) => {
  if (!req.body?.userId) {
    return res
      .status(409)
      .json({ status: 409, message: "user id is required" });
  }

  const postData = await deletePost(req.body.userId, req.params.id);
  return res.status(postData.status).json(postData);
});

postsRouter.get("/details", async (req, res) => {
  const postData = await getPostsWithDetails();
  return res.status(postData.status).json(postData);
});

postsRouter.get("/comment-count", async (req, res) => {
  const postData = await getPostsCommentsCount();
  return res.status(postData.status).json(postData);
});

export { postsRouter };
