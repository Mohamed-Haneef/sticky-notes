import React, { useState, useEffect } from 'react';
import { api } from '../api';
import './../styles/Notes.css';

const Notes = ({ token, setToken }) => {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [currentNote, setCurrentNote] = useState(null);

    useEffect(() => {
        const fetchNotes = async () => {
            setLoading(true);
            const data = await api('/api/notes');
            if (data.error) {
                localStorage.removeItem('token');
                setToken(null);
                alert("Error: " + data.error.message + " Token has been cleared.");
            } else if (data.success) {
                setNotes(data.success);
            } else {
                alert("Unexpected response: " + JSON.stringify(data));
            }
            setLoading(false);
        };
        fetchNotes();
    }, [token, setToken]);

    const handleAddNote = async () => {
        const trimmedContent = content.replace(/[\u0009-\u000D\u0020\u0085\u00A0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/g, '');

        if (!trimmedContent) {
            alert("Note cannot be empty or just whitespace");
            return;
        }

        setLoading(true);

        try {
            const newNote = await api('/api/notes', 'POST', { content });
            if (newNote.success) {
                setNotes([...notes, newNote.success]);
                setContent('');
            } else {
                alert("Error adding note: " + JSON.stringify(newNote));
            }
        } catch (error) {
            alert("An error occurred while adding the note. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        setLoading(true);
        await api(`/api/notes/${id}`, 'DELETE');
        setNotes(notes.filter(note => note._id !== id));
        setLoading(false);
    };

    const handleEdit = async () => {
        if (!currentNote.content.trim()) {
            alert("Note cannot be empty");
            return;
        }
        setLoading(true);
        const updatedNote = await api(`/api/notes/${currentNote._id}`, 'PUT', { content: currentNote.content });
        if (updatedNote.success) {
            setNotes(notes.map(note => note._id === currentNote._id ? updatedNote.success : note));
            setEditModalVisible(false);
        } else {
            alert("Error updating note: " + JSON.stringify(updatedNote));
        }
        setLoading(false);
    };

    const openEditModal = (note) => {
        setCurrentNote(note);
        setEditModalVisible(true);
    };

    const closeEditModal = () => {
        setEditModalVisible(false);
        setCurrentNote(null);
    };

    return (
        <div className="notes-container">
            {loading && (
                <div className="modal">
                    <div className="spinner"></div>
                </div>
            )}
            <h1 className="notes-title">Notes</h1>
            <div className="note-box">
                <textarea
                    className="notes-input"
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter note content"
                />
                <button className="notes-button" onClick={handleAddNote}>Add Note</button>
            </div>
            <ul className="notes-list">
                {Array.isArray(notes) && notes.length > 0 ? (
                    notes.map(note => (
                        <li key={note._id} className="note-item">
                            <div className='note-content-box'>
                                <p>{note.content}</p>
                            </div>
                            <div className='button-box'>
                                <button className="view-button" onClick={() => openEditModal(note)}>Edit</button>
                                <button className="delete-button" onClick={() => handleDelete(note._id)}>Delete</button>
                            </div>
                        </li>
                    ))
                ) : (
                    <li className="no-notes">No notes available, Add your note above!!</li>
                )}
            </ul>
            {editModalVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <button className="close-button" onClick={closeEditModal}>X</button>
                        <textarea
                            style={{ marginTop: '20px', backgroundColor: '#3498db' }}

                            value={currentNote.content}
                            onChange={(e) => setCurrentNote({
                                ...currentNote,
                                content: e.target.value
                            })}
                        ></textarea>
                        <div className="save-box">
                            <button className="save-button" onClick={handleEdit}>Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Notes;
