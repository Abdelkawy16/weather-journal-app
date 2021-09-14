const forecast = require('./utils/forecast');
// Setup Server
const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// setup static directory to serve
app.use(express.static(path.join(__dirname , '../website')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname , '../website/index.html')));
app.get('/weather', (req, res) => {
    if (!req.query.zipcode) {
        return res.send({ error: 'You must provide a zipcode!' });
    }
    forecast(req.query.zipcode, (error, forecastData) => {
        if (error) {
            return res.send({ error });
        }
        res.send({ body: forecastData });
    });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));