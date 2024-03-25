import Note from '../models/note.model.js';
import { errorHandler } from '../utils/error.js';

// Create a new note
export const createNote = async (req, res, next) => {
  const { title, content } = req.body;
  const userId = req.user.id;

  try {
    const newNote = new Note({
      title,
      content,
      userId,
    });
    await newNote.save();
    res.status(201).json({ message: 'Note created successfully!', note: newNote });
  } catch (error) {
    next(error);
  }
};

// Get all notes for a user
export const getNotes = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const notes = await Note.find({ userId });
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

// Get a single note by ID
export const getNoteById = async (req, res, next) => {
  const userId = req.user.id;
  const noteId = req.params.id;

  try {
    const note = await Note.findOne({ _id: noteId, userId });
    if (!note) {
      return next(errorHandler(404, 'Note not found!'));
    }
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

// Update a note
export const updateNote = async (req, res, next) => {
  const userId = req.user.id;
  const noteId = req.params.id;
  const { title, content } = req.body;

  try {
    const updatedNote = await Note.findOneAndUpdate(
      { _id: noteId, userId },
      { $set: { title, content } },
      { new: true }
    );
    if (!updatedNote) {
      return next(errorHandler(404, 'Note not found or you are not authorized to update this note!'));
    }
    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

// Delete a note
export const deleteNote = async (req, res, next) => {
  const userId = req.user.id;
  const noteId = req.params.id;

  try {
    const deletedNote = await Note.findOneAndDelete({ _id: noteId, userId });
    if (!deletedNote) {
      return next(errorHandler(404, 'Note not found or you are not authorized to delete this note!'));
    }
    res.status(200).json({ message: 'Note deleted successfully!' });
  } catch (error) {
    next(error);
  }
};
