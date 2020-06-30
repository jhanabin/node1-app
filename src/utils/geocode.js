const request = require('request');

const geoCode = (address, callback) => {
	const addUrl =
		'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
		encodeURIComponent(address) +
		'.json?access_token=pk.eyJ1IjoibmFiaW5qIiwiYSI6ImNrOWNoN2VkejA0NG4zZW51dW00ZWZvY3cifQ.mLiJBt7Wu2qmjhwpNr4a5g&limit=1';

	request({ url: addUrl, json: true }, (error, response) => {
		if (error) {
			callback('Unable to coonect to Geo app!', undefined);
		} else if (response.body.features.length === 0) {
			callback('this location doesnot exist', undefined);
		} else {
			callback(undefined, {
				latitude: response.body.features[0].center[0],
				longitude: response.body.features[0].center[1],
				location: response.body.features[0].place_name
			});
		}
	});
};

module.exports = geoCode;
