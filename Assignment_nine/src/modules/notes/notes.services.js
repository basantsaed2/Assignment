import mongoose from "mongoose";
import { notesModel } from "../../database/models/notes.model.js";

export const CreateNote = async (userId, noteData) => {
  try {
    const { title, content } = noteData;

    const note = await notesModel.create({
      title,
      content,
      userId,
    });

    return { status: 201, message: "Note created successfully", data: note };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

export const UpdateNote = async (userId, noteId, noteData) => {
  try {
    const { title, content } = noteData;

    const updatedNote = await notesModel.findOneAndUpdate(
      { _id: noteId, userId },
      { title, content },
      { new: true },
    );

    if (!updatedNote) {
      return {
        status: 404,
        message: "Note not found or you don't have permission to update it",
      };
    }

    return {
      status: 200,
      message: "Note updated successfully",
      data: updatedNote,
    };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

export const ReplaceNote = async (userId, noteId, newData) => {
  try {
    const replacedNote = await notesModel.findOneAndReplace(
      { _id: noteId, userId },
      { ...newData, userId },
      { new: true },
    );

    if (!replacedNote) {
      return {
        status: 404,
        message: "Note not found or you don't have permission to update it",
      };
    }

    return {
      status: 200,
      message: "Note replaced successfully",
      data: replacedNote,
    };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

export const UpdateAllNotesTitle = async (userId, newTitle) => {
  try {
    const note = await notesModel.updateMany({ userId }, { title: newTitle });

    return {
      status: 200,
      message: `Updated ${note.modifiedCount} notes successfully`,
      data: note,
    };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

export const DeleteNote = async (userId, noteId) => {
  try {
    const note = await notesModel.findOneAndDelete({ _id: noteId, userId });

    if (!note) {
      return {
        status: 404,
        message: "Note not found or you don't have permission to delete it",
      };
    }

    return {
      status: 200,
      message: "Note deleted successfully",
      data: note,
    };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

export const GetPaginatedNotes = async (userId, page, limit) => {
  try {
    const skip = (page - 1) * limit;

    const notes = await notesModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return {
      status: 200,
      data: notes,
    };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

export const GetNoteById = async (userId, noteId) => {
  try {
    const note = await notesModel.findOne({ _id: noteId, userId });

    if (!note) {
      return {
        status: 200,
        message: "Note not found or you don't have permission to get it",
      };
    }

    return {
      status: 200,
      data: note,
    };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

export const GetNoteByContent = async (userId, content) => {
  try {
    const note = await notesModel.findOne({ 
      userId, 
      content : { $regex: content, $options: 'i' }
      // content: content 
    });

    if (!note) {
      return { status: 404, message: "No note found with this content" };
    }

    return { status: 200, data: note };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

export const GetNotesWithUser = async (userId) => {
  try {
    const note = await notesModel.find({userId})
    .select('title userId createdAt -_id')
    .populate({
      path : "userId", 
      select : 'email -_id'
    })

    if (!note) {
      return { status: 404, message: "No note found" };
    }

    return { status: 200, data: note };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

export const AggregateNotes = async (userId, searchTitle) => {
  try {
    const pipeline = [
      {
        $match: { 
            userId: new mongoose.Types.ObjectId(userId),
            ...(searchTitle && { title: { $regex: searchTitle, $options: 'i' } })
        }
      },
      {
        $lookup: {
          from: "users",        
          localField: "userId", 
          foreignField: "_id",  
          as: "user"          
        }
      },
      {
        $unwind: "$user"
      },
      {
        $project: {
          title: 1,
          createdAt: 1,
          "user.name": 1,
          "user.email": 1,
          _id: 0 
        }
      }
    ];

    const notes = await notesModel.aggregate(pipeline);

    return { status: 200, data: notes };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

export const DeleteAllNotes = async (userId) => {
  try {
    const result = await notesModel.deleteMany({ userId });

    if (result.deletedCount === 0) {
      return { status: 404, message: "No notes found to delete" };
    }

    return {
      status: 200,
      message: `Successfully deleted all your notes (${result.deletedCount} notes).`
    };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};