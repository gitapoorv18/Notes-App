import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import axios from 'axios';

function App() {
  const [notes, setNotes] = useState([]);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [searchTitle, setSearchTitle] = useState('');
  const [searchContent, setSearchContent] = useState('');
  const [editingNoteId, setEditingNoteId] = useState(null);

  const [isExpanded, setIsExpanded] = useState(false);

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(`${API}/notes`);

        setNotes(response.data);
      } catch (error) {
        console.log('error fetching notes', error);
      }
    };

    fetchNotes();
  }, []);

  const addNote = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    try {
      // edit
      if (editingNoteId) {
        const response = await axios.patch(`/api/notes/${editingNoteId}`, {
          title,
          content,
        });

        setNotes((prev) =>
          prev.map((note) =>
            note._id === editingNoteId ? response.data : note
          )
        );
      } else {
        // create
        const response = await axios.post('/api/notes', {
          title,
          content,
        });

        setNotes((prev) => [...prev, response.data]);
      }
      // reset form
      setTitle('');
      setContent('');
      setEditingNoteId(null);

      setIsExpanded(false);
    } catch (error) {
      console.log('error loading data ', error);
    }
  };

  //edit note
  const handleEditNote = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingNoteId(note.id);
    setIsExpanded(true);
  };
  //dekete note
  const deleteNote = async (id) => {
    try {
      await axios.delete(`/api/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (error) {
      console.log('error deleting note', error);
    }
  };
  return (
    <div>
      <Header
        handleSearchTitle={setSearchTitle}
        handleSearchContent={setSearchContent}
      />

      <NoteForm
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        handleAdd={(e) => {
          addNote(e);
        }}
      />

      <NoteList
        notes={notes.filter((note) => {
          const noteTitle = note.title?.toLowerCase() || '';
          const noteContent = note.content?.toLowerCase() || '';

          return (
            noteTitle.includes(searchTitle.toLowerCase()) ||
            noteContent.includes(searchContent.toLowerCase())
          );
        })}
        handleDelete={deleteNote}
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        handleAdd={addNote}
        onEdit={handleEditNote}
      />
    </div>
  );
}

export default App;
