import React, { useState, useEffect } from 'react';

import './App.css';
import Note from './components/Note';
import NoteForm from './components/NoteForm';
import Pagination from './components/Pagination';
import SearchBar from './components/SearchBar';

const App = () => {

  const [notes, setNotes] = useState([]);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [currentPage, setCurrentPage] = useState(1)
  const [notesPerPage, setNotesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(storedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);







  const addNote = (note) => {
    setNotes([...notes, note])

  }
  const editNote = (editNote) => {
    setNotes(notes.map((note) => (note.id === editNote.id ? editNote : note)));
  }
  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id))
  }

  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentNotes = filteredNotes.slice(indexOfFirstNote, indexOfLastNote);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="App">
      <div className="container">
        <h1>NOTES TAKING APP</h1>
        <NoteForm addNote={addNote} editNote={editNote} noteToEdit={noteToEdit} />
        <SearchBar onSearch={setSearchTerm} />
        <div className='notes-container'>
          {currentNotes.map((note) => (
            <Note key={note.id} note={note} onEdit={setNoteToEdit} onDelete={deleteNote} />
          ))}
        </div>

        <Pagination
          notesPerPage={notesPerPage}
          totalNotes={filteredNotes.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default App;
