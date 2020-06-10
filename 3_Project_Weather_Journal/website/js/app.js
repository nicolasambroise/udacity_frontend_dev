/* Personal API Key for OpenWeatherMap API */
const weatherAPI_key = "5501b896717ba7d70c258eb4dce77808";
const weatherAPI_url = "api.openweathermap.org/data/2.5/weather";

/* Global Variables */
const server_url = "http://localhost:9000/";
const default_country = "FR"; // I contact OpenWeatherMap and Luxembourg(LU) is not in the country list, so I choose France(FR) as default
const zipRegexPattern = new RegExp(/^[0-9]{4,5},[A-Z]{2}$/); // Pattern for Zipcode

/* Create a new date instance dynamically with JS */
let d = new Date();
//let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
let newDate = new Date().toLocaleDateString('fr-FR');

/* Function to GET Web API Data -  fetch via OpenWeatherMap */
const getWeather = async (weatherAPI_url, zipcode , weatherAPI_key) => {
	const url = `http://${weatherAPI_url}?zip=${zipcode}&appid=${weatherAPI_key}&units=metric`;
	//console.log("getWeather : "+url);
	const response = await fetch(url);
	try {
      const jsonResponse = await response.json();
      return jsonResponse;
    }catch(error) {
		console.log('error', error);
		alert("Something wrong happened !");
    }
}

/* Function to POST data */
const postData = async (path, data = {}) => {
	console.log(data);
	const response = await fetch(path, {
		method: 'POST',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: { 'Content-Type': 'application/json' },
		redirect: 'follow',
		body: JSON.stringify(data)
	});
}


/* Function to GET data - Update UI function to display response from API */
const updateUI = async () => {
	const request = await fetch(server_url+"all");
	try{
		const allData = await request.json();
		document.getElementById('date').innerHTML =`<span class="entry-item">Date: </span><span class="value">${allData.date}</span>`;
		document.getElementById('temp').innerHTML = `<span class="entry-item">You feel: </span><span class="value">${allData.userResponse}</span>`;
		document.getElementById('content').innerHTML = `<span class="entry-item">Temperature: </span><span class="value">${allData.temperature} C°</span>`;
	} catch(error) {
		console.log('error', error);
		alert("Something wrong happened !");
	};
}

/* Function called by event listener */
const handleClick = async (zipcode,feelingValue) => {
	//console.log("Zip : " + zipcode);
	//console.log("Feel : " + feelingValue);
	const weatherData = await getWeather(weatherAPI_url, zipcode, weatherAPI_key);
	console.log(weatherData);
	if(weatherData.hasOwnProperty("cod") && weatherData.cod == "404") {
		  alert(weatherData.message+" - zipcode:"+zipcode);
	}
	else{
		const data = {
			temperature: weatherData.main.temp,
			date: newDate,
			userResponse: feelingValue
		};
		postData(server_url+"data", data)
			.then(function(data){
				updateUI();
			});
	}
}

/* Event listener to add function to existing HTML DOM element - click on element with 'generate' id */
document.addEventListener("DOMContentLoaded", function() {
	document.getElementById("generate").addEventListener("click", function(event){
		event.preventDefault();
		const zipInput = document.getElementById('zip');
		const feelingInput = document.getElementById('feelings');

		if(zipInput.value != "" && feelingInput.value != ""){
			let zipcode = zipInput.value;
			if(zipcode.indexOf(",") < 0){zipcode = zipcode+","+default_country;}
			const ziptest = zipRegexPattern.test(zipcode);
			console.log(zipcode+" --> "+ziptest)
			if(ziptest){
				handleClick(zipcode,feelingInput.value);
				feelingInput.value = ""; //Reset TextArea to avoid double clic
			}
			else{alert("There are an error in the zipcode format");}
		}
		else{alert("Please, complete the form !");}
	});
});

