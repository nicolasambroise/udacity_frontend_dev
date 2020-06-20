import 'bootstrap';
const $ = require("jquery");
const tripSearchData = {};

const daysLabel = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthsLabel = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


// --------------------------------------------------------
/* Button Handle */
// --------------------------------------------------------

function handleSearch(event) {
	event.preventDefault();
	console.log(">>> search button");
	
	// Get values from Form
	const city = document.getElementById('city').value.toLowerCase();
	const date_start = document.getElementById('date_start').value;
	const date_end = document.getElementById('date_end').value;
  
	// Reset the tripSearchData object
	tripSearchData.city = city;
	tripSearchData.date_start = date_start;
	tripSearchData.date_end = date_end;
	tripSearchData.webImg = "";
	tripSearchData.previewImg = "";
	tripSearchData.largeImg = "";
	tripSearchData.latitude = "";
	tripSearchData.longitude = "";
	tripSearchData.countryCode = "";
	tripSearchData.countryName = "";
	tripSearchData.desc ="";
	tripSearchData.temp="";
	tripSearchData.humidity="";
	
	/* Exemple of tripSearchData object
		city: "paris"
		countryCode: "FR"
		countryName: "France"
		date_end: "2020-06-27"
		date_start: "2020-06-25"
		desc: "Overcast clouds"
		humidity: 68
		largeImg: "https://pixabay.com/get/57e8d6454e53a914f6da8c7dda79367d1c3ddce356586c48702679d0954dc55cb8_1280.jpg"
		latitude: "48.85341"
		longitude: "2.3488"
		previewImg: "https://cdn.pixabay.com/photo/2016/11/18/19/01/paris-1836415_150.jpg"
		temp: 18.3
		webImg: "https://pixabay.com/get/57e8d6454e53a914f1dc846096293477173dd8e05a4c704c7c2d7fd6974dc158_640.jpg"
	*/
	
	
	// Check Date validity
	const period = calculTripPeriod(date_start,date_end);
	if( period <= 0 ){
		alert("Please check your dates");
		return;
	}
  
	// Start Using Promises
	// From https://gomakethings.com/waiting-for-multiple-all-api-responses-to-complete-with-the-vanilla-js-promise.all-method/
    Promise.all([
		// Geonames
		fetchGeonames(city),
		// Pixabay
		fetchPixabay(city)
    ])
	.then(() => {
		if(tripSearchData.countryName != "" && tripSearchData.latitude != "" && tripSearchData.longitude != ""){
			// If no image of the city available take a picture of the country !
			if(tripSearchData.webImg == "" && period < 15){
				Promise.all([
					// Weatherbit
					fetchWeatherbit(tripSearchData.latitude,tripSearchData.longitude,tripSearchData.date_start),
					// Pixabay
					fetchPixabay(tripSearchData.countryName)
				])
				.then(() => {
					// Now we have all APIs response
					console.log(tripSearchData); 
					showModal(tripSearchData);
				})
				.catch(function (error) {console.log(error);})
			}
			else if(period < 15){
				// Weatherbit
				fetchWeatherbit(tripSearchData.latitude,tripSearchData.longitude,tripSearchData.date_start)
				.then(() => {
					// Now we have all APIs response
					console.log(tripSearchData); 
					showModal(tripSearchData);
				})
				.catch(function (error) {console.log(error);})
			}
			else if(tripSearchData.webImg == ""){
				// Pixabay
				fetchPixabay(tripSearchData.countryName)
				.then(() => {
					// Now we have all APIs response
					console.log(tripSearchData); 
					showModal(tripSearchData);
				})
				.catch(function (error) {console.log(error);})
			}
			else{
				console.log(tripSearchData); 
				showModal(tripSearchData);
			}
		}
		else{
			alert("Please check your location name !");
		}
	})
	.catch(function (error) {console.log(error);})
}

function handleSave(event) {
	event.preventDefault();
	console.log(">>> save button");
	
    fetch('http://localhost:9000/save',
      {
        method: 'POST',
		mode: "cors",
        headers: { 
			"Content-Type": "application/json" 
		},
        body: JSON.stringify({ 'trip': tripSearchData })
      })
	.then(res => res.json())
    .then(data => {
		console.log(data);
		$('#tripModal').modal('hide');
		document.getElementById("result").style.display = 'block';
        document.getElementById('my-trips').insertAdjacentHTML("afterbegin", buildCard(tripSearchData,data.index));
	});
}

function handleDisplay(index) {
    console.log(">>> display button on card "+index);
	fetch('http://localhost:9000/trip',
      {
        method: 'POST',
		mode: "cors",
        headers: { 
			"Content-Type": "application/json" 
		},
        body: JSON.stringify({ 'index': index })
      })
	.then(res => res.json())
    .then(data => {
		console.log(data);
		showModal(data.trip);
	});
}

function handleCancel(event) {
	event.preventDefault();
	console.log(">>> cancel button");
    $('#tripModal').modal('hide');
}

function handleDelete(index) {
    console.log(">>> delete button on card "+index);
	document.getElementById('card'+index).remove();
	
	// Delete on server + Reload Cards
	 fetch('http://localhost:9000/remove',
      {
        method: 'POST',
		mode: "cors",
        headers: { 
			"Content-Type": "application/json" 
		},
        body: JSON.stringify({ 'index': index })
      })
	  .then(res => res.json())
	  .then(stripCards => {
		console.log(stripCards);
		document.getElementById("my-trips").innerHTML = "";
		if(stripCards.length > 0){
			document.getElementById("result").style.display = 'block';
			stripCards.forEach((stripCard,index) => {
				const htmlCard = buildCard(stripCard.trip,index);
				//console.log(htmlCard);
				document.getElementById('my-trips').insertAdjacentHTML("afterbegin", htmlCard);
			});
		}
		else{
			document.getElementById("result").style.display = 'none';
		}
	  });	
}
// --------------------------------------------------------
/* Fetchs */
// --------------------------------------------------------

	function fetchGeonames(city) {
	    return fetch("http://localhost:9000/geoname", {
				method: "POST",
				mode: "cors",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({ 'location': city })
			})
			.then(res => res.json())
			.then(responses => {
				console.log(responses);
				if(responses.geonames.length > 0){
					tripSearchData.latitude = responses.geonames[0].lat;
					tripSearchData.longitude = responses.geonames[0].lng;
					tripSearchData.countryCode = responses.geonames[0].countryCode;
					tripSearchData.countryName = responses.geonames[0].countryName;
				}
			})
			.catch(function (error) {console.log(error);})
	}

	function fetchPixabay(city) {
	    return fetch("http://localhost:9000/pixabay", {
				method: "POST",
				mode: "cors",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({ 'location': city })
			})
			.then(res => res.json())
			.then(responses => {
				if(responses.hits.length > 0){
					tripSearchData.webImg = responses.hits[0].webformatURL;
					tripSearchData.previewImg = responses.hits[0].previewURL;
					tripSearchData.largeImg = responses.hits[0].largeImageURL;
				}
			})
			.catch(function (error) {console.log(error);})
	}
	
	function fetchWeatherbit(lat,lon,start){
		return fetch("http://localhost:9000/weatherbit", {
				method: "POST",
				mode: "cors",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({ 'lat': lat, 'lon' : lon})
			})
			.then(res => res.json())
			.then(responses => {
				console.log(responses);
				if(responses.data.length > 0){
					for (let i = 0; i < responses.data.length; i++) {
						//console.log(start+" == "+responses.data[i].valid_date);
						if(start == responses.data[i].valid_date){			
							tripSearchData.temp = responses.data[i].temp;
							tripSearchData.humidity = responses.data[i].rh;
							tripSearchData.desc = responses.data[i].weather.description;
							break;
						}
					}
				}
				else{
					console.log("Weather forcast not found");
				}
			})
			.catch(function (error) {console.log(error);})
	}

// --------------------------------------------------------
/* Features */
// --------------------------------------------------------

// Add Today as Min Date on Input field
const initDateField = () => {
	const today = new Date();
	let dd = today.getDate();
	let mm = today.getMonth()+1;
	let yyyy = today.getFullYear();
	if(dd<10){dd='0'+dd;} 
	if(mm<10){mm='0'+mm;} 
	const dateMin = yyyy+'-'+mm+'-'+dd;
	document.getElementById("date_start").setAttribute("min", dateMin);	
	document.getElementById("date_end").setAttribute("min", dateMin);	
	// From https://stackoverflow.com/questions/32378590/set-date-input-fields-max-date-to-today
}

// Calcul Trip period
const calculTripPeriod = (start, end) => {
  const tripStart = Date.parse(start);
  const tripEnd = Date.parse(end);
  const period = Math.ceil((tripEnd - tripStart) / (1000 * 60 * 60 * 24));
  return period+1;
  // From https://stackoverflow.com/questions/3224834/get-difference-between-2-dates-in-javascript
}

// Calcul time before trip
const calculTripCountdown = (start) => {
  const tripStart = Date.parse(start);
  const today = new Date();
  const countdown = Math.ceil((tripStart - today) / (1000 * 60 * 60 * 24));
  return countdown;
  // From https://stackoverflow.com/questions/3224834/get-difference-between-2-dates-in-javascript
}

const formatLongTripDate = (date) => {
  // Thursday, June 4th 2020
  const tripDate = new Date(date);
  const tripDateformatted = `${daysLabel[tripDate.getDay()]}, ${monthsLabel[tripDate.getMonth()]} ${tripDate.getDate()}, ${tripDate.getFullYear()}`;
  return tripDateformatted;
  // From https://stackoverflow.com/questions/9677757/how-to-get-the-day-of-the-week-from-the-day-number-in-javascript
}

const formatShortTripDate = (date,format) => {
  // 04/06
  const tripDate = new Date(date);
  const tripDateformatted = `${("0" + tripDate.getDate()).slice(-2)}/${("0" + (tripDate.getMonth() + 1)).slice(-2)}`;
  return tripDateformatted;
  // From https://stackoverflow.com/questions/6040515/how-do-i-get-month-and-date-of-javascript-in-2-digit-format/42389398
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
  // From https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
}

const showModal = (displayedTrip) => {
  $('#tripModal').modal({keyboard: false});
  // Documentation : https://getbootstrap.com/docs/4.0/components/modal/

  // Modal Title
  document.getElementById('tripModalTitle').innerHTML = `${capitalizeFirstLetter(displayedTrip.city)}, ${displayedTrip.countryName}`;
  
  //Modal Image
  document.getElementById('tripModalImg').setAttribute('src', displayedTrip.webImg);  

  // Modal Info
		/*
		0 - trip to
		1 - Departure
		2 - Return
		3 - Duration
		4 - Countdown
		5 - Temp
		6 - humidity
		7 - Weather
		*/
  const trip_info = document.querySelectorAll('#tripModal .trip_info');
  trip_info[0].innerText = `${capitalizeFirstLetter(displayedTrip.city)}, ${displayedTrip.countryName}`;
  trip_info[1].innerText = formatLongTripDate(displayedTrip.date_start);
  trip_info[2].innerText = formatLongTripDate(displayedTrip.date_end);
  trip_info[3].innerText = `${calculTripPeriod(displayedTrip.date_start, displayedTrip.date_end)} days`;
  trip_info[4].innerText = `${calculTripCountdown(displayedTrip.date_start)} days away`;
  if(displayedTrip.temp != "" && displayedTrip.humidity != "" && displayedTrip.desc != ""){
	  trip_info[5].innerText = `${displayedTrip.temp} °C`;
	  trip_info[6].innerText = `${displayedTrip.humidity} %`;
	  trip_info[7].innerText = displayedTrip.desc;
  }
  else{
	  trip_info[5].innerText = "No forcast available";
	  trip_info[6].innerText = "No forcast available";
	  trip_info[7].innerText = "No forcast available";
  }
}

const displayAllCards = () => {
  document.getElementById("my-trips").innerHTML = "";
  
  fetch('http://localhost:9000/all')
	.then(res => res.json())
    .then(stripCards => {
		console.log(stripCards);
		if(stripCards.length > 0){			
			document.getElementById("result").style.display = 'block';
			stripCards.forEach((stripCard,index) => {
				const htmlCard = buildCard(stripCard.trip,index);
				//console.log(htmlCard);
				document.getElementById('my-trips').insertAdjacentHTML("afterbegin", htmlCard);
			});
		}
		else{
			document.getElementById("result").style.display = 'none';
		}
	});
	
  
}

const buildCard = (trip,index) => {
	let htmlCard =`<div class="col-sm-12 col-md-4 col-lg-3" id="card${index}">
	    <div class="card">
		  <img class="card-img-top" src="${trip.previewImg}" alt="Image of ${capitalizeFirstLetter(trip.city)}, ${trip.countryName}">
		  <div class="card-body">
			<h5 class="card-title">${capitalizeFirstLetter(trip.city)}, ${trip.countryCode}</h5>
			<h6 class="card-subtitle mb-2 text-muted">${formatShortTripDate(trip.date_start)} - ${formatShortTripDate(trip.date_end)}</h6>`;
	if(	trip.temp !="" && trip.desc != ""){	htmlCard += `<p class="card-text">The Weather should be ${trip.desc} (${trip.temp} °C)</p>`;}
	htmlCard += `</div>
		  <div class="card-body">
			<button class="btn btn-info btn-sm" onclick="Client.handleDisplay(${index})">Show</button>
			<button class="btn btn-secondary btn-sm" onclick="Client.handleDelete(${index})">Delete</button>
		  </div>
		  <div class="card-footer text-muted">
				${calculTripCountdown(trip.date_start)} days away.
		  </div>
		</div>
	  </div>`;
	return htmlCard;
}


// --------------------------------------------------------
/* Init */
// --------------------------------------------------------

initDateField(); // Set minDate = today

/* Add event listeners */
document.getElementById('trip_search').addEventListener('click', handleSearch);
document.querySelector('.trip_save').addEventListener('click', handleSave);
document.querySelectorAll('.trip_cancel').forEach(element => {
  element.addEventListener('click', handleCancel);
});

// Add existing saved Cards
displayAllCards();
export {handleSearch, handleSave, handleDisplay, handleCancel, handleDelete};
