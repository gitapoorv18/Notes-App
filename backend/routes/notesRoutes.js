import express from 'express';
import Note from '../models/notesModel.js';

const router = express.Router();

// get all notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//add a note

router.post('/', async (req, res) => {
  const note = new Note({
    title: req.body.title,
    content: req.body.content,
  });
  try {
    const newNote = await note.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// update note
router.patch('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    if (req.body.title !== undefined) {
      note.title = req.body.title;
    }
    if (req.body.content !== undefined) {
      note.content = req.body.content;
    }
    if (req.body.completed !== undefined) {
      note.completed = req.body.completed;
    }

    const updatedNote = await note.save();
    res.json(updatedNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// delete a note
router.delete('/:id', async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'Note Deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
export default router;
