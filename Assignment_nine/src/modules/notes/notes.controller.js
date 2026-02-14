import { Router } from "express";
import { auth } from "../../middlewares/authenticated.js";
import {
  CreateNote,
  ReplaceNote,
  UpdateNote,
  UpdateAllNotesTitle,
  DeleteNote,
  GetPaginatedNotes,
  GetNoteById,
  GetNoteByContent,
  GetNotesWithUser,
  AggregateNotes,
  DeleteAllNotes
} from "./notes.services.js";

const noteRouter = Router();

noteRouter.post("/", auth, async (req, res) => {
  const noteData = await CreateNote(req.userId, req.body);
  res.status(noteData.status).json(noteData);
});

noteRouter.patch("/bulk-update", auth, async (req, res) => {
  const noteData = await UpdateAllNotesTitle(req.userId, req.body.title);
  res.status(noteData.status).json(noteData);
});

noteRouter.get("/note-by-content", auth, async (req, res) => {
  const noteData = await GetNoteByContent(req.userId, req.query.content);
  res.status(noteData.status).json(noteData);
});

noteRouter.get("/note-with-user", auth, async (req, res) => {
  const noteData = await GetNotesWithUser(req.userId);
  res.status(noteData.status).json(noteData);
});

noteRouter.get("/aggregate", auth, async (req, res) => {
    const noteData = await AggregateNotes(req.userId, req.query.title);
    res.status(noteData.status).json(noteData);
});

noteRouter.put("/:noteId", auth, async (req, res) => {
  const noteData = await ReplaceNote(req.userId, req.params.noteId, req.body);
  res.status(noteData.status).json(noteData);
});

noteRouter.patch("/:noteId", auth, async (req, res) => {
  const noteData = await UpdateNote(req.userId, req.params.noteId, req.body);
  res.status(noteData.status).json(noteData);
});

noteRouter.delete("/:noteId", auth, async (req, res) => {
  const noteData = await DeleteNote(req.userId, req.params.noteId);
  res.status(noteData.status).json(noteData);
});

noteRouter.get("/paginate-sort", auth, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 1;

  const noteData = await GetPaginatedNotes(req.userId, page, limit);
  res.status(noteData.status).json(noteData);
});

noteRouter.get("/:noteId", auth, async (req, res) => {
  const noteData = await GetNoteById(req.userId, req.params.noteId);
  res.status(noteData.status).json(noteData);
});

noteRouter.delete("/", auth, async (req, res) => {
    const noteData = await DeleteAllNotes(req.userId);
    res.status(noteData.status).json(noteData);
});


export { noteRouter };
