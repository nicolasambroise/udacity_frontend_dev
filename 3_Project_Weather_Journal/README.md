# Weather-Journal App Project

## Table of Contents

* [Overview](#overview)
* [Instructions](#instructions)
* [Installation](#installation)
* [Style-Guide](#style-guide)

## Overview
This project requires you to create an asynchronous web app that uses Web API and user data to dynamically update the UI. 

## Instructions
This will require modifying the `server.js` file and the `website/app.js` file. You can see `index.html` for element references, and once you are finished with the project steps, you can use `style.css` to style your application to customized perfection.

- How do I setup a Node environment with Express and the necessary project dependencies?
- How do I setup a server with GET and POST routes?
- How do I create developer credentials for a Web API?
- How do I use the Fetch API with my credentials and user input to get dynamic data into my app routes?
- How do I access a GET route on the server side, from a function called on the client side?
- How do I chain Promises together
- How do I access HTML elements with JavaScript and set their properties dynamically?

## Installation
Prerequise : have node and npm installed. 


#### Who to install the server part
Use the following command on your terminal
```
npm start
```
#### Who to use this app
Simply navigate to http://localhost:9000

#### More information
I contact OpenWeatherMap and Luxembourg(LU) is not in the country list, so I choose France(FR) as default Country
You can change the default country in "app.js" or juste use the format "54000,FR" in the input field to select another country.
I also convert Temperature in Celcius as I'm in Europe. You can by-pass it in "app.js" file.

## Style-Guide

See below for the Udacity Style Guide used thoroughout the Front End Nanodegree.

* [CSS Style Guide](http://udacity.github.io/frontend-nanodegree-styleguide/css.html)
* [HTML Style Guide](http://udacity.github.io/frontend-nanodegree-styleguide/)
* [JavaScript Style Guide](http://udacity.github.io/frontend-nanodegree-styleguide/javascript.html)
* [Git Style Guide](https://udacity.github.io/git-styleguide/)