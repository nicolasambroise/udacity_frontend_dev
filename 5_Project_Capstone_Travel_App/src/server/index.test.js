const fetch = require("node-fetch");
const $ = require('jquery');
const testData = {		
		city: "paris",
		countryCode: "FR",
		countryName: "France",
		date_end: "2020-06-27",
		date_start: "2020-06-25",
		desc: "Overcast clouds",
		humidity: 68,
		largeImg: "https://pixabay.com/get/57e8d6454e53a914f6da8c7dda79367d1c3ddce356586c48702679d0954dc55cb8_1280.jpg",
		latitude: "48.85341",
		longitude: "2.3488",
		previewImg: "https://cdn.pixabay.com/photo/2016/11/18/19/01/paris-1836415_150.jpg",
		temp: 18.3,
		webImg: "https://pixabay.com/get/57e8d6454e53a914f1dc846096293477173dd8e05a4c704c7c2d7fd6974dc158_640.jpg"
}
let resultSize = 0;


describe("formHandler action button", () => {
	 	
	// GET /all
	test("Check GET /all return a result", () => {
		fetch('http://localhost:9000/all')
		.then(res => res.json())
		.then(data => {
			expect(data).toBeDefined();
			expect(data.length).toBeGreaterThanOrEqual(0);
			resultSize = data.length;
		})
		.catch(function (error) {console.log(error);})
	});
		
	// POST /save
	test("Check POST /save return a result", () => {
		fetch('http://localhost:9000/save',
		  {
			method: 'POST',
			mode: "cors",
			headers: { 
				"Content-Type": "application/json" 
			},
			body: JSON.stringify({ 'trip': testData })
		  })
		.then(res => res.json())
		.then(data => {
			expect(data.index).toBeDefined();
			expect(data.index).toBeGreaterThanOrEqual(0);
			expect(data.index).toBe(resultSize);
		})
		.catch(function (error) {console.log(error);})
		
	});
	  
	// POST /trip
	test("Check POST /trip return a result", () => {
		fetch('http://localhost:9000/trip',
		  {
			method: 'POST',
			mode: "cors",
			headers: { 
				"Content-Type": "application/json" 
			},
			body: JSON.stringify({ 'index': resultSize })
		  })
		.then(res => res.json())
		.then(data => {
			expect(data.trip).toBeDefined();
			expect(data.trip.city).toBe("paris");
			expect(data.trip.desc).toBe("Overcast clouds");
		})
		.catch(function (error) {console.log(error);})
	});
	
	// POST /remove
	test("Check POST /remove return a result", () => {
		fetch('http://localhost:9000/remove',
		  {
			method: 'POST',
			mode: "cors",
			headers: { 
				"Content-Type": "application/json" 
			},
			body: JSON.stringify({ 'index': resultSize })
		  })
		  .then(res => res.json())
		  .then(data => {
			    expect(data).toBeDefined();
				expect(data.length).toBeGreaterThanOrEqual(0);
				expect(data.length).toBe(resultSize);
		  });
	});
	
	// POST /geoname
	test("Check POST /geoname return a result", () => {
		fetch("http://localhost:9000/geoname", {
				method: "POST",
				mode: "cors",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({ 'location': 'luxembourg' })
			})
			.then(res => res.json())
			.then(responses => {
				//console.log(responses);
				expect(responses.geonames.length).toBeGreaterThan(0);
				expect(responses.geonames[0].lat).toBeDefined();
				expect(responses.geonames[0].lng).toBeDefined();
				expect(responses.geonames[0].countryCode).toBeDefined();
				expect(responses.geonames[0].countryName).toBeDefined();
				expect(responses.geonames[0].lat).toBe("49.75");
				expect(responses.geonames[0].lng).toBe("6.16667");
				expect(responses.geonames[0].countryCode).toBe("LU");
				expect(responses.geonames[0].countryName).toBe("Luxembourg");
			})
			.catch(function (error) {console.log(error);})
	  });
	
	// POST /weatherbit
	test("Check POST /weatherbit return a result", () => {
		fetch("http://localhost:9000/weatherbit", {
				method: "POST",
				mode: "cors",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({ 'lat': '49.75', 'lon' : '6.16667'})
			})
			.then(res => res.json())
		    .then(responses => {
				expect(responses.data.length).toBeGreaterThan(0);
				expect(responses.data[0].temp).toBeDefined();
				expect(responses.data[0].rh).toBeDefined();
				expect(responses.data[0].weather.description).toBeDefined();
				expect(responses.data[0].rh).toBeGreaterThanOrEqual(0);
				expect(responses.data[0].rh).toBeLessThanOrEqual(100);
				expect(responses.data[0].temp).toBeGreaterThanOrEqual(-10);
				expect(responses.data[0].temp).toBeLessThanOrEqual(40);
				expect(responses.data[0].weather.description).not.toBe("");
			})
			.catch(function (error) {console.log(error);})
	});
	
	// POST /pixabay
	test("Check POST /pixabay return a result", () => {
		  fetch("http://localhost:9000/pixabay", {
				method: "POST",
				mode: "cors",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({ 'location': 'luxembourg' })
			})
			.then(res => res.json())
			.then(responses => {
				expect(responses.hits.length).toBeGreaterThan(0);
				expect(responses.hits[0].webformatURL).toBeDefined();
				expect(responses.hits[0].previewURL).toBeDefined();
				expect(responses.hits[0].largeImageURL).toBeDefined();
				expect(responses.hits[0].webformatURL).toMatch(/pixabay.com/);
				expect(responses.hits[0].previewURL).toMatch(/pixabay.com/);
				expect(responses.hits[0].largeImageURL).toMatch(/pixabay.com/);
			})
			.catch(function (error) {console.log(error);})
	});
	
});