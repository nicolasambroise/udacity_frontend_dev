// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');


// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));
    
const port = 9000;
// Spin up the server
const server = app.listen(port, function () {
    console.log(`Application running on localhost: ${port}`);
});

// Initialize all route with a callback function
// Callback function to complete GET '/all'
app.get("/all", (req, res) => res.send(projectData));

// POST route adds data to ProjectData
app.post("/data", (req, res) => {
  console.log(req.body);
  projectData = req.body;
  res.send(projectData);
});