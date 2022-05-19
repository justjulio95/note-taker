const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes')

//this will grant access to things listed in the public folder - CSS, HTML, JS, etc.
//NOTE: index.js is initiated with this line. 
app.use(express.static('public'))

//parse incoming string/array data
app.use(express.urlencoded({extended: true}));

//parse incoming JSON data
app.use(express.json())

//instruct the server on what paths to take using the routes we created
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () => {
    console.log(`API server now LIVE on http://localhost:${PORT}`)
})