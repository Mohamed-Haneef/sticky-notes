import React, { useState, useEffect } from 'react';
import Note from './Note';
import Modal from './Modal';
import NoteForm from './NoteForm';

function Body() {
    console.log("Body loaded")
    const [notes, setNotes] = useState([]);
    const [modalContent, setModalContent] = useState(null);
    const [loading, setLoading] = useState(true); // Track loading state
  
    useEffect(() => {
      fetch('https://notezard.selfmade.social/api/notes')
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch notes');
          }
          return response.json();
        })
        .then(data => {
          setNotes(data);
          setLoading(false); // Set loading to false after fetching data
        })
        .catch(error => {
          console.error('Error fetching notes:', error);
          setLoading(false); // Set loading to false on error
        });
    }, []);
  
    const handleAdd = (newNote) => {
      fetch('https://notezard.selfmade.social/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to add note');
          }
          return response.json();
        })
        .then(data => {
          setNotes([...notes, data]);
        })
        .catch(error => console.error('Error adding note:', error));
    };
  
    const handleDelete = id => {
      if (window.confirm('Are you sure you want to delete this note?')) {
        fetch(`https://notezard.selfmade.social/api/notes/${id}`, {
          method: 'DELETE',
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to delete note');
            }
            return response.json(); // Parse the response as JSON
          })
          .then(data => {
            console.log('Server message:', data.message); // Log the server message
            setNotes(notes.filter(note => note._id !== id));
          })
          .catch(error => console.error('Error deleting note:', error));
      }
    };
  
    const handleView = note => {
      setModalContent(note);
    };
  
    if (loading) {
      return <div>Loading...</div>; 
    }
  
    return (
      <div>
        <NoteForm onAdd={handleAdd} />
        <div className='noteSection'>
          {notes.map(note => (
            <Note
              key={note._id}
              note={note}
              onDelete={handleDelete}
              onView={handleView}
            />
          ))}
          {modalContent && (
            <Modal note={modalContent} onClose={() => setModalContent(null)} />
          )}
        </div>
      </div>
    );
  }

  export default Body;