const express = require("express")
const router = express.Router()
const { body, validationResult } = require('express-validator');
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");

/////////////////////////////////////////////////////////////////////////////////////////////////
// ^Route 1: Get all notes for the corresponding user :- 
// ^Route  {POST} -> /api/notes/fetchallnotes -> requires auth-token (login required)

router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        res.status(500).send("Internal Server Occurred!")
    }
})

/////////////////////////////////////////////////////////////////////////////////////////////////
// ^Route 2: Add a new note using the post request :- 
// ^Route {POST} -> /api/notes/addnote -> requires auth-token (login required)

router.post("/addnote", fetchuser, [
    body('title', "Title must contain at least 3 characters").isLength({ min: 3 }),
    body('description', "Description must be contain at least 5 characters.").isLength({ min: 5 })
], async (req, res) => {

    try {
        const { title, description, tag } = req.body;

        // checking for any error if so block access  
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // make the note and save it, later return the same note as response!
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)
    } catch (error) {

    }
})

////////////////////////////////////////////////////////////////////////////////////////////////////


// ^Route 3: Update notes for the corresponding user :- 
// ^Route {PUT} -> /api/notes/updatenote/:id -> requires auth-token (login required)
router.put("/updatenote/:id", fetchuser, [
    body('title', "Title must contain at least 3 characters").isLength({ min: 3 }),
    body('description', "Description must be contain at least 5 characters.").isLength({ min: 5 })
], async (req, res) => {

    const { title, description, tag } = req.body;

    let note = await Note.findById(req.params.id);

    // ! Security checks

    // check whether the note is available or not
    if (!note) {
        return res.status(404).send("No notes found!");
    }

    // check whether the user id (from the login) is equals to the user id from the note 
    // This is done to avoid any unauthorized access who try to edit the note of another person.
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Unauthorized access");
    }

    // ! Finally updating the user's note

    // create a newNote Object
    const newNote = {};
    if (title) { newNote.title = title }
    if (description) { newNote.description = description }
    if (tag) { newNote.tag = tag }

    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json({ note });

})
////////////////////////////////////////////////////////////////////////////////////////////////////

// ^Route 4: Delete notes for the corresponding user :- 
// ^Route {DELETE} -> /api/notes/deletenote/:id -> requires auth-token (login required)
router.delete("/deletenote/:id", fetchuser, async (req, res) => {

    const { title, description, tag } = req.body;

    let note = await Note.findById(req.params.id);

    // ! Security checks

    // check whether the note is available or not
    if (!note) {
        return res.status(404).send("No notes found!");
    }

    // check whether the user id (from the login) is equals to the user id from the note 
    // This is done to avoid any unauthorized access who try to edit the note of another person.
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Unauthorized access");
    }

    // ! Finally deleting the user's note

    note = await Note.findByIdAndDelete(req.params.id)
    res.status(200).json({ "Success": `Note with the id ${req.params.id} has been deleted successfully` })
})



////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = router