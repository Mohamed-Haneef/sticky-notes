import React from "react";

function Modal({ note, onClose }) {
    return (
        <div className="modal">
            <div className="modalContent" style={{ backgroundColor: 'white' }}>
                <h4>{note.heading}</h4>
                <p>{note.content}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default Modal;