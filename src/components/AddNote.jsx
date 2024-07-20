import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "default" })


    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "default" });
        props.showAlert("Note added successfully", "info")
    }

    const onChange = (e) => {
        // "...note" here is used to make a shallow copy of the original note and change the args provided by the user
        // instead of creating separate checks for each field this will update the changed elements automatically..
        setNote({ ...note, [e.target.name]: e.target.value })
    }




    return (
        <div className="container my-3 bg-body-tertiary p-4">
            <h2>Add Notes</h2>

            <div className="container my-3 ">
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" value={note.title} id="title" name="title" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" value={note.description} id="description" name="description" onChange={onChange} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" value={note.tag} id="tag" name="tag" onChange={onChange} />
                    </div>

                    <button disabled={note.title.length < 3 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add note</button>
                </form>
            </div>


        </div>
    )
}

export default AddNote
