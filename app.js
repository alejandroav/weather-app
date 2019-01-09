const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

geocode.geocodeAddress(argv.address,
	(errorMessage, results) => {
		if (errorMessage) {
			console.log(errorMessage);
		} else {
			console.log(`At ${results.address}, ${results.city}:`);
			weather.getWeather(results.latitude, results.longitude,
				(errorMessage, results) => {
					if (errorMessage) {
						console.log(errorMessage);
					} else {
						console.log(`It's ${results.temperature}º and it feels like ${results.apparentTemperature}º.`);
					}
				}
			);
		}
	}
);