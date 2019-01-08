const request = require('request');
request(
	{
		url: 'http://www.mapquestapi.com/geocoding/v1/address?key=ujyWRpOGAA6pGS750Rf1HeKsvOorKuUo&location=plaza%20pablo%20iglesias%20petrer%20spain',
		json: true
	},
	(err, res, body) => {
		console.log(`Address: ${body.results[0].locations[0].street}`);
		console.log(`Lat: ${body.results[0].locations[0].latLng.lat}`);
		console.log(`Long: ${body.results[0].locations[0].latLng.lng}`);
	}
);