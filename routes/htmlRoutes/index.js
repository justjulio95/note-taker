const path = require('path');
const router = require('express').Router();

//set up the route linking the SERVER to the HTML which will be displayed
router.get('/', (req, res) => {
    //sends the listed file to the server at its root '/'
    //NOTE: this would TYPICALLY be BLAND HTML. This project is using BOOTSTRAP, so all the style stuff is being handled.
    res.sendFile(path.join(__dirname, '../../public/index.html'))
})

//set up the route linking the SERVER to the NOTES.html file to be displayed!
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/notes.html"))

    console.log(__dirname + " <-- that's where we start. this is where the file is at: ../../public/notes.html")
})

// Ensures that random routes that don't exist will just lead to the index page. 
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'))
})

module.exports = router;