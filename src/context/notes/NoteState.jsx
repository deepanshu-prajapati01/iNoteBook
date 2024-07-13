import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const notesInitial = [
        {
            "_id": "668cdbf011e9e42053826b01",
            "user": "668cdb558a7c3b77139eb4b6",
            "title": "Hello i am back baby",
            "description": "This is a cool description",
            "tag": "General",
            "date": "2024-07-09T06:42:56.635Z",
            "__v": 0
        },
        {
            "_id": "668cdbfc11e9e42053826b06",
            "user": "668cdb558a7c3b77139eb4b6",
            "title": "sampleTitle",
            "description": "This is a cool description",
            "tag": "General",
            "date": "2024-07-09T06:43:08.085Z",
            "__v": 0
        },
        {
            "_id": "668cdbfc11e9e42053826b08",
            "user": "668cdb558a7c3b77139eb4b6",
            "title": "sampleTitle",
            "description": "This is a cool description",
            "tag": "General",
            "date": "2024-07-09T06:43:08.324Z",
            "__v": 0
        },
        {
            "_id": "668cdc0111e9e42053826b0b",
            "user": "668cdb558a7c3b77139eb4b6",
            "title": "sampleTitle",
            "description": "This is a cool description",
            "tag": "General",
            "date": "2024-07-09T06:43:13.754Z",
            "__v": 0
        },
        {
            "_id": "668cdc0111e9e42053826b0d",
            "user": "668cdb558a7c3b77139eb4b6",
            "title": "sampleTitle",
            "description": "This is a cool description",
            "tag": "General",
            "date": "2024-07-09T06:43:13.875Z",
            "__v": 0
        },
        {
            "_id": "668cdc0111e9e42053826b0f",
            "user": "668cdb558a7c3b77139eb4b6",
            "title": "sampleTitle",
            "description": "This is a cool description",
            "tag": "General",
            "date": "2024-07-09T06:43:13.995Z",
            "__v": 0
        },
        {
            "_id": "668cdc0211e9e42053826b11",
            "user": "668cdb558a7c3b77139eb4b6",
            "title": "sampleTitle",
            "description": "This is a cool description",
            "tag": "General",
            "date": "2024-07-09T06:43:14.114Z",
            "__v": 0
        },
        {
            "_id": "668cdc0211e9e42053826b13",
            "user": "668cdb558a7c3b77139eb4b6",
            "title": "sampleTitle",
            "description": "This is a cool description",
            "tag": "General",
            "date": "2024-07-09T06:43:14.235Z",
            "__v": 0
        },
        {
            "_id": "668cdc0211e9e42053826b15",
            "user": "668cdb558a7c3b77139eb4b6",
            "title": "sampleTitle",
            "description": "This is a cool description",
            "tag": "General",
            "date": "2024-07-09T06:43:14.356Z",
            "__v": 0
        },
        {
            "_id": "668cdc0211e9e42053826b17",
            "user": "668cdb558a7c3b77139eb4b6",
            "title": "sampleTitle",
            "description": "This is a cool description",
            "tag": "General",
            "date": "2024-07-09T06:43:14.492Z",
            "__v": 0
        },
        {
            "_id": "668cdc0211e9e42053826b19",
            "user": "668cdb558a7c3b77139eb4b6",
            "title": "sampleTitle",
            "description": "This is a cool description",
            "tag": "General",
            "date": "2024-07-09T06:43:14.611Z",
            "__v": 0
        },
        {
            "_id": "668cdc0211e9e42053826b1b",
            "user": "668cdb558a7c3b77139eb4b6",
            "title": "sampleTitle",
            "description": "This is a cool description",
            "tag": "General",
            "date": "2024-07-09T06:43:14.739Z",
            "__v": 0
        },
        {
            "_id": "668cdc0211e9e42053826b1d",
            "user": "668cdb558a7c3b77139eb4b6",
            "title": "sampleTitle",
            "description": "This is a cool description",
            "tag": "General",
            "date": "2024-07-09T06:43:14.884Z",
            "__v": 0
        }
    ]

    const [notes, setNotes] = useState(notesInitial)

    // Add a note
    const addNote = (title, description, tag) => {
        // API CALL
        console.log("Adding a new note!")
        const note = {
            "_id": "668cdbf011e9e42053826b01",
            "user": "668cdb558a7c3b77139eb4b6",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2024-07-09T06:42:56.635Z",
            "__v": 0
        }
        setNotes(notes.concat(note))

    }

    // Delete a note
    const deleteNote = () => {

    }
    // Edit a note
    const editNote = () => {

    }


    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;