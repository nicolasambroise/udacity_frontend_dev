//Use Environment Variables
const dotenv = require('dotenv');
dotenv.config();

// Global variable
var path = require('path')
const PORT = 9000;

// Require Express to run server and routes
const express = require('express')

// Start up an instance of app
const app = express();

/* Dependencies & Middleware*/
const bodyParser = require("body-parser");
const cors = require("cors");
const async = require('express-async-errors'); // to check
const fetch = require('node-fetch'); // to check
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize the main project folder
app.use(express.static('dist'));
console.log(__dirname)

// Set API credentials from .env
console.log(`Your GEONAME API key is ${process.env.API_GEONAME_KEY}`);
console.log(`Your WEATHERBIT API key is ${process.env.API_WEATHERBIT_KEY}`);
console.log(`Your PIXABAY API key is ${process.env.API_PIXABAY_KEY}`);

const GEONAME_KEY = process.env.API_GEONAME_KEY;
const WEATHERBIT_KEY = process.env.API_WEATHERBIT_KEY;
const PIXABAY_KEY = process.env.API_PIXABAY_KEY;

// Setup empty JS object to act as endpoint for all routes
tripsData = []; // Array with all saved trips

/* GET Routes */

// Initialize all route with a callback function
app.get('/', (req, res) => {
    // res.sendFile('dist/index.html'); // Prod ?
	res.sendFile(path.resolve('src/client/views/index.html'))
});

// Callback function to complete GET '/all' trips
app.get("/all", (req, res) => res.send(tripsData));


/* POST Routes */

// POST route return selected trip
app.post("/trip", (req, res) => {
	console.log(req.body);
	res.send(tripsData[req.body.index]); 
});

// POST route adds data to tripsData
app.post("/save", (req, res) => {
	console.log(req.body);
	tripsData.push(req.body);
	res.send({"index" : (tripsData.length -1)}); 
});

// POST route remove data from tripsData
app.post("/remove", (req, res) => {
	console.log(req.body);
	tripsData.splice(req.body.index, 1)
	res.send(tripsData); 
});

// GEONAME
app.post('/geoname', async (req, res) => {
	if (req.body.location && req.body.location != "" && req.body.location != " ") {
		const endpoint = "http://api.geonames.org/searchJSON?formatted=true&q="+ req.body.location +'&username='+GEONAME_KEY+'&style=full&maxRows=1'; 
		// Documentation : https://www.geonames.org/export/geonames-search.html
		console.log(endpoint);
		try {
			const response = await fetch(endpoint);
			if (response.ok) {
				const jsonResponse = await response.json();
				res.status(201).send(jsonResponse);
			}
		} catch (error) {
			console.log(error);
		}
	} else {
		res.status(400).json('Location is missing');
	}
});

// WEATHERBIT
app.post('/weatherbit', async (req, res) => {
	if (req.body.lat && req.body.lon) {
		const endpoint = "https://api.weatherbit.io/v2.0/forecast/daily?lat="+req.body.lat+"&lon="+req.body.lon+"&key="+WEATHERBIT_KEY+"&units=M&lang=en"; //lang=fr --> French
		// Documentation : https://www.weatherbit.io/api/weather-forecast-16-day
		// To check : Weatherbit also allow City name, so why should we use Geoname before to get lat/long ???
		console.log(endpoint);
		try {
			const response = await fetch(endpoint);
			if (response.ok) {
				const jsonResponse = await response.json();
				res.status(201).send(jsonResponse);
			}
		} catch (error) {
			console.log(error);
		}
	} else {
		res.status(400).json('Lat/Lon coordinate are missing');
	}
});

// PIXABAY
app.post('/pixabay', async (req, res) => {
	if (req.body.location && req.body.location != "" && req.body.location != " ") {
		const endpoint = "https://pixabay.com/api/?key="+PIXABAY_KEY+"&q="+req.body.location+"&lang=en&image_type=photo&orientation=horizontal&pretty=true&category=places&min_width=150px&min-height=150px&safesearch=true&per_page=3";
		// Documentation : https://pixabay.com/api/docs/
		console.log(endpoint);
		try {
			const response = await fetch(endpoint);
			if (response.ok) {
				const jsonResponse = await response.json();
				res.status(201).send(jsonResponse);
			}
		} catch (error) {
			console.log(error);
		}
	} else {
		res.status(400).json('Location is missing');
	}
});

// designates what port the app will listen to for incoming requests
app.listen(PORT, () => console.log(`Application listening on port ${PORT}!`));