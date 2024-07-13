import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "default" })


    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
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
                        <input type="text" className="form-control" id="title" name="title" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" onChange={onChange} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} />
                    </div>

                    <button type="submit" className="btn btn-primary" onClick={handleClick}>Add note</button>
                </form>
            </div>


        </div>
    )
}

export default AddNote
