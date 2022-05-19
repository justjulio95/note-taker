const fs = require('fs');
const path = require('path')

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
        path.join(__dirname, '../db/db.json'),
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

module.exports = {
    filterByQuery,
    findById,
    createNewNote,
    validateNote
}