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

geocode.geocodeAddress(argv.address)
	.then((results) => {		
			console.log(`At ${results.address}, ${results.city}:`);
			return weather.getWeather(results.latitude, results.longitude);
	})
	.then((results) => {
		console.log(`It's ${results.temperature}º and it feels like ${results.apparentTemperature}º.`);
	})
	.catch((error) => {
		console.log(error);
	});