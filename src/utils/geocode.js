const request = require('request');

function geocode(address, cb) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoib3JicnkiLCJhIjoiY2p5enEwNnJ1MDN6bzNlbXk1ajhmdXlvcyJ9.JkjUI-eJD9wG6ag7EYlhTA&limit=1&language=en`;

    request({ url, json: true }, (err, { body: { features } = [] } = {}) => {
        if (err) {
            cb('Unable to connect to geolocation service!');
        } else if (!features.length) {
            cb('Unable to find address!');
        } else {
            const { center: [ longitude, latitude ], place_name: location } = features[0];

            cb(null, {
                longitude,
                latitude,
                location
            });
        }
    })
}

module.exports = geocode;
