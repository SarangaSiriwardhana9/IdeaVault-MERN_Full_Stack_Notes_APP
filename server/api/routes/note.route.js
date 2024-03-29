import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import {
  createNote,
  getNotesByUserId,
  
  updateNote,
  deleteNote,
} from '../controllers/note.controller.js';

const router = express.Router();

// Note routes
router.post('/create-note',verifyToken, createNote);
router.get('/getNotesByUserId', verifyToken, getNotesByUserId);
//router.get('/get-note-by-id/:id', verifyToken, getNoteById);
router.put('/update-note/:id', verifyToken, updateNote);
router.delete('/delete-note/:id', verifyToken, deleteNote);

export default router;
