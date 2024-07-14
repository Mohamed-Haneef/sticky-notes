import React, { useState, useEffect } from 'react';
import { api } from '../api';

const Notes = ({ token }) => {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState('');

    useEffect(() => {
        const fetchNotes = async () => {
            const data = await api('/api/notes');
            setNotes(data);
        };
        fetchNotes();
    }, [token]);

    const handleAddNote = async () => {
        const newNote = await api('/api/notes', 'POST', { content });
        setNotes([...notes, newNote]);
        setContent('');
    };

    const handleDelete = async (id) => {
        await api(`/api/notes/${id}`, 'DELETE');
        setNotes(notes.filter(note => note._id !== id));
    };

    return (
        <div>
            <h1>Notes</h1>
            <input type="text" value={content} onChange={(e) => setContent(e.target.value)} />
            <button onClick={handleAddNote}>Add Note</button>
            <ul>
                {Array.isArray(notes) && notes.length > 0 ? (
                    notes.map(note => (
                        <li key={note._id}>
                            {note.content}
                            <button onClick={() => handleDelete(note._id)}>Delete</button>
                        </li>
                    ))
                ) : (
                    <li>No notes available</li>
                )}
            </ul>
        </div>
    );
};

export default Notes;