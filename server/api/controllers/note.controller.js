import Note from "../models/note.model.js";
import { errorHandler } from "../utils/error.js";

// Create a new note
export const createNote = async (req, res, next) => {
  const { title, content, color } = req.body;

  if (!title || !content ) {
    return next(errorHandler(400, 'Title, content, and color are required'));
  }

  try {
    const newNote = new Note({
      title,
      content,
      userId: req.user.id,
      color,
    });
    await newNote.save();
    res.status(201).json({ message: 'Note created successfully!', note: newNote });
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
  const { title, content,color  } = req.body;

  try {
    const note = await Note.findById(id);

    if (!note) {
      return next(errorHandler(404, 'Note not found'));
    }

    if (note.userId == req.user.id) {
      const updatedNote = await Note.findByIdAndUpdate(
        id,
        { title, content,color },
        { new: true }
      );
      
      return res.status(200).json(updatedNote);
    }
    
    return next(errorHandler(403, 'You are not authorized to update this note'));
 
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


    await Note.findByIdAndDelete(id);
    res.status(200).json({ message: "Note deleted successfully!" });
  } catch (error) {
    next(error);
  }
};

// Update the pinned status of a note
export const updateNotePinnedStatus = async (req, res, next) => {
  const { id } = req.params;
  const { isPinned } = req.body;

  try {
      const note = await Note.findById(id);
      if (!note) {
          return next(errorHandler(404, 'Note not found'));
      }

      const pinnedCount = await Note.countDocuments({ userId: req.user.id, isPinned: true });
      if (isPinned && pinnedCount >= 6) {
          return next(errorHandler(400, 'Maximum of 6 notes can be pinned'));
      }

      if (note.userId == req.user.id) {
          note.isPinned = isPinned;
          await note.save();

          res.status(200).json(note);
      } else {
          return next(errorHandler(403, 'You are not authorized to update this note'));
      }
  } catch (error) {
      next(error);
  }
};


// Search notes by title or content
export const searchNotes = async (req, res, next) => {
  const { query } = req.query;
  try {
    const userId = req.user.id; // Assuming req.user contains the logged-in user's ID
    const regex = new RegExp(query, 'i'); // Case-insensitive search

    const notes = await Note.find({
      userId,
      $or: [{ title: regex }, { content: regex }],
    });

    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

// Get a note by ID
export const getNoteById = async (req, res, next) => {
  const { id } = req.params;

  try {
      const note = await Note.findById(id);

      if (!note) {
          return next(errorHandler(404, 'Note not found'));
      }

      res.status(200).json(note);
  } catch (error) {
      next(error);
  }
};