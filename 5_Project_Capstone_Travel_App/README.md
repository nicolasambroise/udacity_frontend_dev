# Capstone Travel App

## Table of Contents

* [Overview](#overview)
* [Instructions](#instructions)
* [Installation](#installation)
* [Style-Guide](#style-guide)

## Overview
You will be building a travel application. It’s common to pull basic data from an API, but many applications don’t just pull the weather, they pull in multiple types of data, from different sources and occasionally one API will be required to get data from another API.

The project will include a simple form where you enter the location you are traveling to and the date you are leaving. If the trip is within a week, you will get the current weather forecast. If the trip is in the future, you will get a predicted forecast. The OpenWeather API is fantastic but it doesn’t let you get future data for free and it’s not that flexible with what information you enter; we are going to use the Weatherbit API for you to see how another API accomplishes the same goals. Weatherbit API has one problem, it only takes in coordinates for weather data -- it’s that specific. So, we’ll need to get those coordinates from the Geonames API. Once we have all of this data, we’ll want to display an image of the location entered; for this, we will be using the Pixabay API.

This may not sound like a lot, but there is a fair amount of moving pieces that rely on each other to work. You’ll need to plan out the logic of what you are trying to accomplish before you begin developing. There are a lot of paths you can take, and what you choose to display and how you display it is somewhat flexible. It is highly recommended that after you meet the minimum requirements in the rubric, you continue debugging the UX and improve the project.

## Instructions
This project requires you to build out a travel app that, at a minimum, obtains a desired trip location & date from the user, and displays weather and an image of the location using information obtained from external APIs. Given that this is the Capstone project, it's highly encouraged for you to go above and beyond, adding additional functionality and customization to truly stand out with a project you are proud to have at the top of your portfolio!

At this point, you have learned all of the technical skills necessary to complete this project. You will likely stumble along the way and find that there are some pieces you didn’t encounter in the past projects. Remember, if you get stuck, you should always look things up. Sometimes just articulating the problem renders a solution.

The following are just some of the questions that you’ll experience along the way:
-What’s the ideal workflow?
-How many files do I need?
-How do I convert one project into another?
-Should I redo the HTML/CSS first or go straight to the javascript?
-How many JavaScript functions do I need?
-Should my function be this many lines of code?
-Is readability or performance more important?

## Installation
Prerequise : 
- have node and npm installed. 
- You have an account on Geonames (Signup [here](http://www.geonames.org/export/web-services.html))
- You have an account on Weatherbit (Signup [here](https://www.weatherbit.io/account/create))
- You have an account on Pixabay (Signup [here](https://pixabay.com/api/docs/))

#### Step 1
Edit the .env file in the root folder with your API credentials
```
API_GEONAME_KEY=****
API_WEATHERBIT_KEY=****
API_PIXABAY_KEY=****
```

#### Step 2
`cd` into your root folder and run:
- `npm install`

#### Use the development server
Use the following command on your terminal
```
npm run build-dev
npm start
```
This will open our browser automatically to "http://localhost:3000"
(The Server part will run on http://localhost:9000)

#### Use the production server
Use the following command on your terminal
```
npm run build-prod
npm start
```
Then simply navigate to http://localhost:9000

#### Run Test 
Use the following command on your terminal for Jest Test
```
npm run test
```

## Style-Guide

See below for the Udacity Style Guide used thoroughout the Front End Nanodegree.

* [CSS Style Guide](http://udacity.github.io/frontend-nanodegree-styleguide/css.html)
* [HTML Style Guide](http://udacity.github.io/frontend-nanodegree-styleguide/)
* [JavaScript Style Guide](http://udacity.github.io/frontend-nanodegree-styleguide/javascript.html)
* [Git Style Guide](https://udacity.github.io/git-styleguide/)
