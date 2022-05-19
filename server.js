const express = require('express');
const PORT = process.env.PORT || 3001;
const {notes} = require('./db/db.json');
const fs = require('fs');
const path = require('path');
const app = express();

//parse incoming string/array data
app.use(express.urlencoded({extended: true}));

//parse incoming JSON data
app.use(express.json())

//This will allow us to search for specific notes in our app (may not need later??? might be cool to add???)
function filterByQuery(query, notesArray) {
    let filteredResults = notesArray;

    //convert/translate query searches to match JSON data
    if(query.title) {
        filteredResults = filteredResults.filter(note => note.title === query.title)
    }
    if(query.text) {
        filteredResults = filteredResults.filter(note => note.text === query.text)
    }
    return filteredResults
}

//This will allow us to search for notes by their ID number in the JSON file
//AGAIN NOT NECESSARY FOR NOW BUT MIGHT BE LATER. GOOD FOR REVIEW EITHER WAY
function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
}

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);

    //write new note to the notes API
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({notes: notesArray}, null, 2)
    );

    //return finished code to post route for response
    return note;
}

//This will ensure that at least a TITLE is provided to save a note
function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false
    }
    return true
}

//WE WONT NEED TO SEARCH FOR NOTES THROUGH ID'S BUT THIS WILL BE IMPORTANT LATER IF/WHEN I DECIDE TO ADD DELETE FUNCTIONALITY
//allows to GET an item from the JSON using req.params
app.get('/api/notes/:id', (req, res) => {
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
app.get('/api/notes', (req, res) => {
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
app.post('/api/notes', (req, res) => {
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

app.listen(PORT, () => {
    console.log(`API server now LIVE on http://localhost:${PORT}`)
})