import React, { useState, useEffect } from 'react';
import { api } from '../api';
import './../styles/Notes.css';

const Notes = ({ token, setToken }) => {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [modalContent, setModalContent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchNotes = async () => {
            setLoading(true);
            console.log("Note fetching: " + token);
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
        if (!content.trim()) {
            alert("Note cannot be empty");
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
            console.error("Error adding note:", error);
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

    const openModal = (noteContent) => {
        setModalContent(noteContent);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setModalContent(null);
        setIsModalOpen(false);
    };

    return (
        <div className="notes-container">
            {loading && (
                <div className="modal">
                    <div className="spinner"></div>
                </div>
            )}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <button className="close-button" onClick={closeModal}>X</button>
                        <div className="modal-body">
                            <p>{modalContent}</p>
                        </div>
                    </div>
                </div>
            )}
            <h1 className="notes-title">Notes</h1>
            <div className="note-box">
                <input
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
                            <p>{note.content}</p>
                            <div className='button-box'>
                                <button className="view-button" onClick={() => openModal(note.content)}>View</button>
                                <button className="delete-button" onClick={() => handleDelete(note._id)}>Delete</button>
                            </div>
                        </li>
                    ))
                ) : (
                    <li className="no-notes">No notes available, Add your note above!!</li>
                )}
            </ul>
        </div>
    );
};

export default Notes;
