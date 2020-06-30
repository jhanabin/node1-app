const request = require('request');

const forecast = (latitude, longitude, callback) => {
	const url =
		'http://api.weatherstack.com/current?access_key=11ee78d28e37ed4ebe73e33d97f771e0&query=' +
		latitude +
		',' +
		longitude +
		'&units=f';

	request({ url: url, json: true }, (error, response) => {
		if (error) {
			callback('Unable to connect Weather stack!', undefined);
		} else if (response.body.error) {
			callback('Problem with Url!', undefined);
		} else {
			callback(undefined, {
				temprature: response.body.current.temperature
			});
		}
	});
};

module.exports = forecast;
