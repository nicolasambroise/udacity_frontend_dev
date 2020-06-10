/* Personal API Key for OpenWeatherMap API*/
const weatherAPI_key = "5501b896717ba7d70c258eb4dce77808";
const weatherAPI_url = "api.openweathermap.org/data/2.5/weather";
const server_url = "http://localhost:9000/";

const fetch = require("node-fetch");
const $ = require('jquery');

test('Check API Weather feature', async () => {
  const getWeather = async (weatherAPI_url, zipcode , weatherAPI_key) => {
	const url = `http://${weatherAPI_url}?zip=${zipcode}&appid=${weatherAPI_key}&units=metric`;
	//console.log("getWeather : "+url);
	const response = await fetch(url);
	let jsonResponse = await response.json();
	return jsonResponse;
  }

	const zipcode = "54000,FR";
		const weatherData = await getWeather(weatherAPI_url, zipcode, weatherAPI_key);
		expect(weatherData).not.toBeNull();
		expect(weatherData).toBeDefined();
		expect(weatherData.name).not.toBeNull();
		expect(weatherData.name).toBeDefined();
		expect(weatherData.name).toBe("Nancy");
		expect(weatherData.main.temp).not.toBeNull();
		expect(weatherData.main.temp).toBeDefined();
		expect(weatherData.main.temp).toBeGreaterThan(-20);
		expect(weatherData.main.temp).toBeLessThan(40);
});

test('updateUI feature', () => {
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
  
  const updateUI = async () => {
	const request = await fetch(server_url+"all");
	try{
		const allData = await request.json();
		$('#date .value').text(`<span class="entry-item">Date: </span><span class="value">${allData.date}</span>`);
		$('#temp .value').text(`<span class="entry-item">You feel: </span><span class="value">${allData.userResponse}</span>`);
		$('#content .value').text(`<span class="entry-item">Temperature: </span><span class="value">${allData.temperature} C°</span>`);
	} catch(error) {
		console.log('error', error);
		alert("Something wrong happened !");
	};
}
	
  const data = {
		temperature: 10,
		date: "01/01/2020",
		userResponse: "good"
	};
	postData(server_url+"data", data).then(function(data){updateUI();})
	.then(function(data){
		expect($('#temp .value').text()).toBe("10 C°");
		expect($('#date .value').text()).toBe("01/01/2020");
		expect($('#content .value').text()).toBe("good");
	});
});

