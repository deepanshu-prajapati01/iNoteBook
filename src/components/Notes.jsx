import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './noteItem';
import { useNavigate } from 'react-router-dom';
const Notes = (props) => {
    let navigate = useNavigate();



    const [note, setNote] = useState({ editTitle: "", editDescription: "", editTag: "" })

    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    const ref = useRef(null)
    const refClose = useRef(null)

    // to load all the notes from the database
    useEffect(() => {
        // check if the user is login or not! if no redirect him to login page
        if (!localStorage.getItem('token')) {
            navigate("/login")
        }

        getNotes();
        // eslint-disable-next-line
    }, [])

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({
            editTitle: currentNote.title,
            editDescription: currentNote.description,
            editTag: currentNote.tag,
            id: currentNote._id
        })
    }



    const handleClick = () => {
        editNote(note.id, note.editTitle, note.editDescription, note.editTag);
        refClose.current.click();
        props.showAlert("Note updated successfully", "success")
    }

    const onChange = (e) => {
        // "...note" here is used to make a shallow copy of the original note and change the args provided by the user
        // instead of creating separate checks for each field this will update the changed elements automatically..
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            {/* MODAL FOR EDITING THE NOTE */}


            {/* <!-- Button trigger modal --> */}
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* form to edit the note */}
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="editTitle" name="editTitle" value={note.editTitle} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="editDescription" value={note.editDescription} name="editDescription" onChange={onChange} />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="editTag" value={note.editTag} name="editTag" onChange={onChange} />
                                </div>
                            </form>

                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.editTitle.length < 3 || note.editDescription.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className='row my-2'>
                <h2>Your Notes</h2>
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />
                })}
            </div>
        </>
    )
}

export default Notes
