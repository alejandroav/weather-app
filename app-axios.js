const yargs = require('yargs');
const axios = require('axios');

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

const encodedAddress = encodeURIComponent(argv.address);
const geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=ujyWRpOGAA6pGS750Rf1HeKsvOorKuUo&location=${encodedAddress}`;

axios.get(geocodeUrl)
	.then(response => {
		if (response.data.info.statuscode !== 0) {
			throw new Error('Unable to find geocode data.');
		}

		const lat = response.data.results[0].locations[0].latLng.lat;
		const long = response.data.results[0].locations[0].latLng.lng;
		const weatherUrl = `https://api.darksky.net/forecast/46bf5274e302615339b26a2e59d85272/${lat},${long}`;

		console.log(response.data.results[0].locations[0].street);
		return axios.get(weatherUrl);
	})
	.then(response => {
		const temp = response.data.currently.temperature;
		const apTemp = response.data.currently.apparentTemperature;
		console.log(`It's ${temp}ºF and it feels like ${apTemp}ºF.`);
	})
	.catch(error => {
		if (error.code === 'ENOTFOUND') {
			console.log('Unable to reach service.');
		} else {
			console.log(error.message);
		}
	});