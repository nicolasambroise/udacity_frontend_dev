# News NLP Project

## Table of Contents

* [Overview](#overview)
* [Instructions](#instructions)
* [Installation](#installation)
* [Style-Guide](#style-guide)

## Overview
I want to introduce you to the topic of Natural Language Processing. NLPs leverage machine learning and deep learning create a program that can interpret natural human speech. Systems like Alexa, Google Assistant, and many voice interaction programs are well known to us, but understanding human speech is an incredibly difficult task and requires a lot of resources to achieve. Full disclosure, this is the Wikipedia definition, but I found it to be a clear one:

> Natural language processing (NLP) is a subfield of computer science, information engineering, and artificial intelligence
concerned with the interactions between computers and human (natural) languages, in particular how to program computers to
process and analyze large amounts of natural language data.

You could spend years and get a masters degree focusing on the details of creating NLP systems and algorithms. Typically, NLP programs require far more resources than individuals have access to, but a fairly new API called Aylien has put a public facing API in front of their NLP system. We will use it in this project to determine various attributes of an article or blog post.

## Instructions
The goal of this project is to give you practice with:
- Setting up Webpack
- Sass styles
- Webpack Loaders and Plugins
- Creating layouts and page design
- Service workers
- Using APIs and creating requests to external urls

## Installation
Prerequise : 
- have node and npm installed. 
- You have an account on Aylien (Signup [here](https://developer.aylien.com/signup))

#### Step 1
Create an .env in the root folder with your Aylien credentials
```
API_ID=**************************
API_KEY=**************************
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
