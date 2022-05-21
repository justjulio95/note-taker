// create an instance of ROUTER so that we're not just creating a brand new server and break the program
const router = require('express').Router();
const {createNewNote} = require('../../lib/notes');
const {notes} = require('../../db/db.json');

//displays the info from NOTES onto the screen
//assigns the address tag as '/api/notes' to access the JSON data
router.get('/notes', (req, res) => {
    res.json(notes)
})

//this will allow the user to add a note to the JSON file
router.post('/notes', (req, res) => {
    //set ID based on what the next index of the array will be
    req.body.id = notes.length.toString()

    //add note to JSON file and notes array in this function
    const note = createNewNote(req.body, notes)
    //req.body is where the incoming content will be
    console.log(req.body)
    res.json(note)
})

module.exports = router