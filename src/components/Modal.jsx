import React from 'react';
import './../styles/Modal.css';

const Modal = ({ isOpen, onClose, onAdd, content, setContent }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Add Note</h2>
                <input
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter note content"
                />
                <button className="modal-button" onClick={onAdd}>Add Note</button>
                <button className="modal-close" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Modal;
