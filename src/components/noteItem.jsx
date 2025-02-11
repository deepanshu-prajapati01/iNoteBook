import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        <div className=" col-md-3 ">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-baseline">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="mx-2 fa-solid fa-pen-to-square" onClick={() => {
                            updateNote(note);
                        }}></i>
                        <i className="mx-2 fa-solid fa-trash" onClick={() => {
                            deleteNote(note._id);
                            props.showAlert("Note Deleted", "danger")
                        }}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>



    )
}

export default NoteItem
