const request = require('request');

function forecast ({ latitude, longitude }, cb) {
    const url = `https://api.darksky.net/forecast/1849414243344ef0567bc35caf8dfb24/${latitude},${longitude}?exclude=minutely,hourly,alerts,flags&units=si`;

    request({ url, json: true }, (err, { body } = {}) => {
        if (err) {
            cb('Unable to connect to weather forecast service!');
        } else if (body.error) {
            cb('Unable to find coordinates!');
        } else {
            const {
                currently: {
                    temperature,
                    precipProbability
                },
                daily: {
                    data: [
                        { summary }
                    ]
                }
            } = body;

            cb(null, `${summary} It is currently ${temperature} degrees out there. There is a ${precipProbability}% chance of rain.`);
        }
    });
}

module.exports = forecast;
