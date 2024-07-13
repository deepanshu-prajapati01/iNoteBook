import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './noteItem';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, addNote } = context;
    return (
        <>
            <div className='row my-2'>
                <h2>Your Notes</h2>
                {notes.map((note) => {
                    return <NoteItem note={note} />
                })}
            </div>
        </>
    )
}

export default Notes
