import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import {
  createNote,
  getNotesByUserId,
  updateNotePinnedStatus,
  searchNotes,
  updateNote,
  deleteNote,
  getNoteById
} from '../controllers/note.controller.js';

const router = express.Router();

// Note routes
router.post('/create-note',verifyToken, createNote);
router.get('/getNotesByUserId', verifyToken, getNotesByUserId);
//router.get('/get-note-by-id/:id', verifyToken, getNoteById);
router.put('/update-note/:id', verifyToken, updateNote);
router.delete('/delete-note/:id', verifyToken, deleteNote);
// Update the pinned status of a note
router.put('/update-note-pinned-status/:id', verifyToken, updateNotePinnedStatus);
router.get('/search-notes', verifyToken, searchNotes);
router.get('/get-note-by-id/:id', verifyToken, getNoteById);


export default router;
