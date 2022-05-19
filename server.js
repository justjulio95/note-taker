const express = require('express');
const app = express()
const PORT = process.env.PORT || 3001
const notes = require('./db/db.json')

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


app.listen(PORT, () => {
    console.log(`API server now LIVE on http://localhost:${PORT}`)
})