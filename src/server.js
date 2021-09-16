// Setup Server
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// setup static directory to serve
const path = require('path');
app.use(express.static(path.join(__dirname, '../website')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../website/index.html')));

let projectData = {};
app.post('/weather', (req, res) => {
    if (req.body.message && req.body.cod) {
        projectData = { error: 'Unable to find a zipcode. Try another search!' }
    } else if (req.body.error) {
        projectData = req.body;
    } else {
        projectData = req.body.main;
    }
});

app.get('/weather', (req, res) => {
    res.send(projectData);
})
app.listen(port, () => console.log(`App listening on port ${port}!`));