const request = require('postman-request');

const forecast = (zipcode, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=18facea61227463c97039d0598f79fbd&query=${zipcode}&units=m`;

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to connect to weather services!', undefined);
        } else if (body.error) {
            callback('Unable to find location. Try another search!', undefined);
        } else {
            let data = {
                temp: body.current.temperature,
                location: `${body.location.name}, ${body.location.region}, ${body.location.country}`,
                localtime: body.location.localtime
            }
            callback(undefined, data);
        }
    });
};

module.exports = forecast;