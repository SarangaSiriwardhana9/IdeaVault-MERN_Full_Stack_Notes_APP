import Note from "../models/note.model.js";
import { errorHandler } from "../utils/error.js";

// Create a new note
export const createNote = async (req, res, next) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return next(errorHandler(400, 'Title and content are required'));
  }

  try {
    const newNote = new Note({
      title,
      content,
      userId: req.user.id, // Assuming req.user contains the logged-in user's ID
    });
    await newNote.save();
    res.status(201).json({ message: "Note created successfully!", note: newNote });
  } catch (error) {
    next(error);
  }
};

// Get all notes by user's ID
export const getNotesByUserId = async (req, res, next) => {
  try {
    const notes = await Note.find({ userId: req.user.id }); // Assuming req.user contains the logged-in user's ID
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

// Update a note
export const updateNote = async (req, res, next) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const note = await Note.findById(id);

    if (!note) {
      return next(errorHandler(404, 'Note not found'));
    }

    if (note.userId !== req.user.id) {
      return next(errorHandler(403, 'You are not authorized to update this note'));
    }

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};


// Delete a note
export const deleteNote = async (req, res, next) => {
  const { id } = req.params;

  try {
    const note = await Note.findById(id);

    if (!note) {
      return next(errorHandler(404, 'Note not found'));
    }

    if (note.userId !== req.user.id) {
      return next(errorHandler(403, 'You are not authorized to delete this note'));
    }

    await Note.findByIdAndDelete(id);
    res.status(200).json({ message: "Note deleted successfully!" });
  } catch (error) {
    next(error);
  }
};