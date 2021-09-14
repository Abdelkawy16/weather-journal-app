const request = require('postman-request');

const forecast = (zipcode, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&APPID=e02a3414e003776ddfd4d6603a56cbca&units=metric`;

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to connect to weather services!', undefined);
        } else if (body.message && body.cod) {
            callback('Unable to find location. Try another search!', undefined);
        } else {
            let projectData = {
                temp: body.main.temp
            }
            callback(undefined, projectData);
        }
    });
};

module.exports = forecast;