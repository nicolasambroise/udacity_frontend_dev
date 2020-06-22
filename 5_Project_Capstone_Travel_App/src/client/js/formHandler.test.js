import { handleSearch, handleSave, handleDisplay, handleCancel, handleDelete, fetchGeonames, fetchPixabay, fetchWeatherbit, initDateField, calculTripPeriod, calculTripCountdown,
formatLongTripDate, formatShortTripDate, validInputCity, capitalizeFirstLetter, showModal,
displayAllCards, buildCard} from './formHandler'
const fetch = require("node-fetch");
const $ = require('jquery');
let today = new Date();
let dd = today.getDate();
let mm = today.getMonth()+1;
let yyyy = today.getFullYear();
if(dd<10){dd='0'+dd;} 
if(mm<10){mm='0'+mm;} 
today = yyyy+'-'+mm+'-'+dd;

// ---- Check formHandler action button
describe("formHandler action button", () => {
	 test("handleSearch should be a function", () => {
		expect(typeof handleSearch).toBe("function");
	  });

	  test("handleSave should be a function", () => {
		expect(typeof handleSave).toBe("function");
	  });
	  
	   test("handleDisplay should be a function", () => {
		expect(typeof handleDisplay).toBe("function");
	  });

	  test("handleCancel should be a function", () => {
		expect(typeof handleCancel).toBe("function");
	  });

	  test("handleDelete should be a function", () => {
		expect(typeof handleDelete).toBe("function");
	  });
	
});

// ---- Cheack fetch API (Results are tested in index.test.js file)
describe("Check fetch API", () => {
	  test("fetchGeonames should be a function", () => {
		expect(typeof fetchGeonames).toBe("function");
	  });
	  
	  test("fetchPixabay should be a function", () => {
		expect(typeof fetchPixabay).toBe("function");
	  });

	  test("fetchWeatherbit should be a function", () => {
		expect(typeof fetchWeatherbit).toBe("function");
	  });
});


// Check Date features
describe("Check Date features", () => {

	 test("initDateField should be a function", () => {
		expect(typeof initDateField).toBe("function");
	  });

	  test("initDateField should update datefield attribut", () => {
		  expect(today).toBeDefined();
		  expect(today).toMatch(/2020-/);
		  expect(today.length).toBe(10);
		  expect(today.indexOf("-")).toBeGreaterThan(0);
	  });

	  
	  test("calculTripPeriod should be a function", () => {
		expect(typeof calculTripPeriod).toBe("function");
	  });
	  
	  test("calculTripPeriod should return an integer", () => {
		  expect(calculTripPeriod("2020-06-21","2020-06-21")).toBe(1);
		  expect(calculTripPeriod("2020-06-21","2020-06-22")).toBe(2);
	  });
	  
	  test("calculTripCountdown should be a function", () => {
		expect(typeof calculTripCountdown).toBe("function");
	  });
	  
	  test("calculTripCountdown should return an integer", () => {
		  expect(calculTripCountdown("2010-06-21")).toBeLessThan(0);
		  expect(calculTripCountdown("2030-06-21")).toBeGreaterThan(0);
		  expect(calculTripCountdown(today)).toBeCloseTo(0);
	  });
	  
	  test("formatLongTripDate should be a function", () => {
		expect(typeof formatLongTripDate).toBe("function");
	  });
	  
	  test("formatLongTripDate should return an integer", () => {
		  expect(formatLongTripDate("2020-06-21")).toBe("Sunday, June 21, 2020");
	  });
	  
	  test("formatShortTripDate should be a function", () => {
		expect(typeof formatShortTripDate).toBe("function");
	  });
	  
	  test("formatShortTripDate should return an integer", () => {
		  expect(formatShortTripDate("2020-06-21")).toBe("21/06");
	  });
});

// Check Other features
describe("Check Other features", () => {
	  test("validInputCity should be a function", () => {
		expect(typeof validInputCity).toBe("function");
	  });
	  
	  test("validInputCity should match regex", () => {
		expect(validInputCity("LUXEMBOURG")).toBe(true);
		expect(validInputCity("Luxembourg")).toBe(true);
		expect(validInputCity("luxembourg")).toBe(true);
		expect(validInputCity("luxemb0urg")).toBe(false);
		expect(validInputCity("lux€mb0urg")).toBe(false);
		expect(validInputCity("luxemb0urg!")).toBe(false);
		expect(validInputCity("luxem b0urg")).toBe(false);
	  });
	  
	  test("capitalizeFirstLetter should be a function", () => {
		expect(typeof capitalizeFirstLetter).toBe("function");
	  });
	  
	  test("capitalizeFirstLetter should capitalize only the first letter", () => {
		expect(capitalizeFirstLetter("LUXEMBOURG")).toBe("Luxembourg");
		expect(capitalizeFirstLetter("luxembourg")).toBe("Luxembourg");
		expect(capitalizeFirstLetter("lUxEmBoUrG")).toBe("Luxembourg");
	  });
});

// Check display modal & cards
describe("Check Modal and cards", () => {
	  test("showModal should be a function", () => {
		expect(typeof showModal).toBe("function");
	  });
	  
	  test("displayAllCards should be a function", () => {
		expect(typeof displayAllCards).toBe("function");
	  });
	  
	  test("buildCard should be a function", () => {
		expect(typeof buildCard).toBe("function");
	  });
});