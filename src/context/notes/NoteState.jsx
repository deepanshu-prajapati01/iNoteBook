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
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4Y2RiNTU4YTdjM2I3NzEzOWViNGI2In0sImlhdCI6MTcyMDUwNzIyMX0.wTbyleWZAj3CZP_wLAH1Az6QzLfCMwaVpIwiaVaAEtg",
                    "Content-Type": "application/json"
                }
            }
        );
        const json = await response.json()
        console.log(json)
        setNotes(json)
    }


    // ^ Add a note
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnote`,
            {
                method: "POST",
                headers: {
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4Y2RiNTU4YTdjM2I3NzEzOWViNGI2In0sImlhdCI6MTcyMDUwNzIyMX0.wTbyleWZAj3CZP_wLAH1Az6QzLfCMwaVpIwiaVaAEtg",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title, description, tag })
            }
        );
        console.log("Adding a new note")
        const note = {
            "_id": "61322f119553781a8ca8d0e08",
            "user": "6131dc5e3e4037cd4734a0664",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2021-09-03T14:20:09.668Z",
            "__v": 0
        };
        setNotes(notes.concat(note))
    }







    // ^ Delete a note
    const deleteNote = async (id) => {
        console.log("Deleting a note!")
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);
    }



    // ^ Edit a note
    const editNote = async (id, title, description, tag) => {
        const response = await fetch(`${host}/api/notes/updatenote/${id}`,
            {
                headers: {
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4Y2RiNTU4YTdjM2I3NzEzOWViNGI2In0sImlhdCI6MTcyMDUwNzIyMX0.wTbyleWZAj3CZP_wLAH1Az6QzLfCMwaVpIwiaVaAEtg",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title, description, tag })
            }
        )
        // const json = await response.json();

        // LOGIC TO ADD IN CLIENT
        for (let index = 0; index < notes.length; index++) {
            const element = notes.length;
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }
        }
    }




    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;