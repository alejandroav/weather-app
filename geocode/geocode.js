const request = require('request');

var geocodeAddress = (address) => {
	return new Promise((resolve, reject) => {
		const encodedAddress = encodeURIComponent(address);
		request(
			{
				url: `http://www.mapquestapi.com/geocoding/v1/address?key=ujyWRpOGAA6pGS750Rf1HeKsvOorKuUo&location=${encodedAddress}`,
				json: true
			},
			(err, res, body) => {
					if (err || body.info.statuscode !== 0) {
					reject('Unable to reach geolocation service.');
				} else {
					resolve({
						address: body.results[0].locations[0].street,
						city: body.results[0].locations[0].adminArea5,
						latitude: body.results[0].locations[0].latLng.lat,
						longitude: body.results[0].locations[0].latLng.lng
					});
				}
			}
		);
	});
};

module.exports = {
	geocodeAddress
};