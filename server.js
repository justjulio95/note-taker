const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes')

//instruct the server on what paths to take using the routes we created
app.use('/api', apiRoutes);
app.use('/', htmlRoutes)

//parse incoming string/array data
app.use(express.urlencoded({extended: true}));

//parse incoming JSON data
app.use(express.json())

//this will grant access to things listed in the public folder - CSS, HTML, JS, etc.
//NOTE: This won't have much, if any effect on this project. It's all BOOTSTRAP.
//NOTE+: index.js is initiated with this line. 
app.use(express.static('public'))

app.listen(PORT, () => {
    console.log(`API server now LIVE on http://localhost:${PORT}`)
})