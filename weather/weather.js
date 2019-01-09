const request = require('request');

var getWeather = (lat, long, callback) => {
	request(
		{
			url: `https://api.darksky.net/forecast/46bf5274e302615339b26a2e59d85272/${lat},${long}`,
			json: true
		},
		(err, res, body) => {
			if (err || res.statusCode !== 200) {
				callback('Unable to reach weather service.');
			} else {
				callback(undefined, {
					temperature: body.currently.temperature,
					apparentTemperature: body.currently.apparentTemperature
				});
			}
		}
	);
};

module.exports = {
	getWeather,
};