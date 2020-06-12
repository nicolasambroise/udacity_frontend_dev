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
const mockAPIResponse = require('./mockAPI.js')
const aylien = require("aylien_textapi");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize the main project folder
app.use(express.static('dist'));
console.log(__dirname)

// set aylien API credentias
console.log(`Your API key is ${process.env.API_KEY}`);
var textApi = new aylien({
	application_id: process.env.API_ID,
	application_key: process.env.API_KEY
});

// Initialize all route with a callback function
app.get('/', function (req, res) {
    // res.sendFile('dist/index.html'); // Prod ?
    res.sendFile(path.resolve('src/client/views/index.html'))
});

app.post("/aylien", (req, res) => {
	const data = req.body;
	console.log("Request to '/aylien' endpoint", data);
	textApi.sentiment(data,(error, result, remaining) => {
		if (error === null) {
			console.log("Aylien Callback", result, remaining);
			res.send(result);
		}
		else { console.log(error);}
	});
});


// TEST REST

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
});


app.post("/test", (req, res) => {
	const data = req.body;
	console.log("Request to '/aylien' endpoint", data);

	textApi.sentiment({'text': 'John is a very good football player!'}, 
		(error, result, remaining) => {
		if (error === null) {
			console.log("Aylien Callback", result, remaining);
			res.send(result);
		}
		else { console.log(error);}
	});
});

// designates what port the app will listen to for incoming requests
app.listen(PORT, () => console.log(`Application listening on port ${PORT}!`));