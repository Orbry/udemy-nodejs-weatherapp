const path = require('path');
const chalk = require('chalk');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Paths for Express cfg
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Handlebars engine and templates location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Set static assets directory to serve
app.use(express.static(publicPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Orbry'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Orbry'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Orbry',
        message: 'If you are hurt - see a doctor immediately!'
    });
});

app.get('/weather', ({ query: { address } }, res) => {
    if (!address) {
        return res.send({
            error: 'Address is not provided in query'
        });
    }

    geocode(address, (error, { location, ...coords } = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(coords, (error, forecast) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                location,
                forecast,
                address
            });
        });
    });
});

app.get('/products', (req, res) => {
    console.log(chalk.yellow(`\nIncoming ${req.method} Request on "${req.url}":`));
    console.log(req.query);
    if (!req.query.search) {
        return res.send({
            error: 'Search term not provided'
        });
    }

    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Orbry',
        message: 'Help article not found!'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Orbry',
        message: 'Page not found!'
    });
});

app.listen(3000, () => {
    console.log('Web server stared on port 3000');
});
