import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './noteItem';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes } = context;
    return (
        <>
            <div className='row my-2'>
                <h2>Your Notes</h2>
                {notes.map((note) => {
                    return <NoteItem key={note._id} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes
