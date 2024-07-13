import React from "react";

function Note({ note, onDelete, onView }) {
    const bgColor = ["red", "green", "blue"];
    const random = Math.floor(Math.random() * bgColor.length);
    const randomBg = bgColor[random];

    return (
        <div className="stickyNote" style={{ backgroundColor: randomBg }}>
            <div className="noteContent">
                <h4>{note.heading}</h4>
                <p>{note.content}</p>
                <div>
                    <i className="bi bi-eye" onClick={() => onView(note)}></i>
                    <i className="bi bi-trash3" onClick={() => onDelete(note._id)}></i>
                </div>
            </div>
        </div>
    );
}

export default Note;
