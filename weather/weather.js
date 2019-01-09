const request = require('request');

var getWeather = (lat, long) => {
	return new Promise((resolve, reject) => {
		request(
			{
				url: `https://api.darksky.net/forecast/46bf5274e302615339b26a2e59d85272/${lat},${long}`,
				json: true
			},
			(err, res, body) => {
				if (err || res.statusCode !== 200) {
					reject('Unable to reach weather service.');
				} else {
					resolve({
						temperature: body.currently.temperature,
						apparentTemperature: body.currently.apparentTemperature
					});
				}
			}
		);
	});
};

module.exports = {
	getWeather,
};