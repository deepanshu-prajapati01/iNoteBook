import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)

    // ^ Get all notes
    const getNotes = async () => {
        // API CALL HERE
        const response = await fetch(`${host}/api/notes/fetchallnotes`,
            {
                method: "GET",
                headers: {
                    "auth-token": localStorage.getItem('token'),
                    "Content-Type": "application/json"
                }
            }
        );
        const json = await response.json()
        setNotes(json)
    }


    // ^ Add a note
    const addNote = async (title, description, tag) => {
        if (title.length <= 3 || description.length <= 5) {
            document.getElementById('title').value = '';
            document.getElementById('description').value = '';
            return
        }
        const response = await fetch(`${host}/api/notes/addnote`,
            {
                method: "POST",
                headers: {
                    "auth-token": localStorage.getItem('token'),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title, description, tag })
            }
        );
        console.log("Adding a new note")
        const note = await response.json()
        setNotes(notes.concat(note))
    }







    // ^ Delete a note
    const deleteNote = async (id) => {
        // delete from server (backend)
        const response = await fetch(`${host}/api/notes/deletenote/${id}`,
            {
                method: "DELETE",
                headers: {
                    "auth-token": localStorage.getItem('token'),
                    "Content-Type": "application/json"
                }
            }
        );


        // delete from frontend
        console.log("Deleting a note!")
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);



    }



    // ^ Edit a note
    const editNote = async (id, title, description, tag) => {
        const response = await fetch(`${host}/api/notes/updatenote/${id}`,
            {
                method: "PUT",
                headers: {
                    "auth-token": localStorage.getItem('token'),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title, description, tag })
            }
        )

        const json = await response.json();
        console.log(json);
        // const json = await response.json();

        // LOGIC TO ADD IN CLIENT
        let newNotes = JSON.parse(JSON.stringify(notes))

        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }




    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;