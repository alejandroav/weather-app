const request = require('request');
const yargs = require('yargs');

const argv = yargs
	.options({
		address:{
			demand: true,
			alias: 'a',
			describe: 'Address to fetch weather from.',
			string: true
		}
	})
	.help()
	.alias('help', 'h')
	.argv;

request(
	{
		url: `http://www.mapquestapi.com/geocoding/v1/address?key=ujyWRpOGAA6pGS750Rf1HeKsvOorKuUo&location=${encodeURIComponent(argv.address)}`,
		json: true
	},
	(err, res, body) => {
		console.log(`Address: ${body.results[0].locations[0].street}`);
		console.log(`Lat: ${body.results[0].locations[0].latLng.lat}`);
		console.log(`Long: ${body.results[0].locations[0].latLng.lng}`);
	}
);