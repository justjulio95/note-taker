// create an instance of ROUTER so that we're not just creating a brand new server and break the program
const router = require('express').Router();
const {filterByQuery, findById, createNewNote, validateNote} = require('../../lib/notes');
const {notes} = require('../../db/db.json');

//WE WONT NEED TO SEARCH FOR NOTES THROUGH ID'S BUT THIS WILL BE IMPORTANT LATER IF/WHEN I DECIDE TO ADD DELETE FUNCTIONALITY
//allows to GET an item from the JSON using req.params
router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    // checks to see if the search is valid
    if(result){
        res.json(result)
    } else{
        res.send(404)
    }
})

//displays the info from NOTES onto the screen
//assigns the address tag as '/api/notes' to access the JSON data
router.get('/notes', (req, res) => {
    let results = notes;
    if(req.query) {
        results = filterByQuery(req.query, results)
    }
    //req is short for REQUEST
    //allows for a search to look something like "[URL]/api/notes?title=Test Title"
    console.log(req.query)
    res.json(results)
})

//this will allow the user to add a note to the JSON file
router.post('/notes', (req, res) => {
    //set ID based on what the next index of the array will be
    req.body.id = notes.length.toString()

    //if there is no title in the note, send an error back
    if (!validateNote(req.body)) {
        res.status(400).send('Please add a title before saving this note.')
    } else {
        //add note to JSON file and notes array in this function
        const note = createNewNote(req.body, notes)
        //req.body is where the incoming content will be
        console.log(req.body)
        res.json(note)
    }
})

module.exports = router