//#region Declaration
const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

//Define Express path config
const publicPathDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../views');
const partialPath = path.join(__dirname, '../views/partials');

const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');
//#endregion

//Setup handlebars engine and view location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

//setup static directory to serve
app.use(express.static(publicPathDir));

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		creator: 'Nabin Jha'
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'What help do you need'
	});
});

app.get('/help/*', (req, res) => {
	res.render('error', {
		title: 'Error',
		errorMsg: 'Help article not found'
	});
});

app.get('/about', (req, res) => {
	res.send('Hello About!');
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'You must provide an address!'
		});
	}
	const address = req.query.address;
	//calling weather methods
	geoCode(address, (error, data) => {
		if (error) {
			return res.send({ error: error });
		}

		forecast(data.latitude, data.longitude, (error, forecastData) => {
			if (error) {
				return res.send({ error: error });
			}

			res.send({
				address: data,
				temprature: forecastData.temprature
			});
		});
	});
});

app.get('*', (req, res) => {
	res.render('error', {
		title: 'Error',
		errorMsg: '404 - Page Not Found'
	});
});

app.listen(3000, () => {
	console.log('App server is up and running');
});
