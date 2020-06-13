import { handleSubmitURL } from '../formHandlerURL'
const fetch = require("node-fetch");
const $ = require('jquery');

test("TEST the POST request to Aylien API with an URL", () => {
	const data = {'url': 'http://udacity.com/'};
	
	fetch("http://localhost:9000/aylien", {
		method: "POST",
		mode: "cors",
		headers: {
		  "Content-Type": "application/json"
		},
		body: JSON.stringify(data)
	})
	.then(res => res.json())
	.then(data => {
		expect(data.polarity).not.toBeNull();
		expect(data.subjectivity).not.toBeNull();
		expect(data.polarity_confidence).not.toBeNull();
		expect(data.subjectivity_confidence).not.toBeNull();
		expect(data.summary).not.toBeNull();
		expect(data.polarity).toBeDefined();
		expect(data.subjectivity).toBeDefined();
		expect(data.polarity_confidence).toBeDefined();
		expect(data.subjectivity_confidence).toBeDefined();
		expect(data.summary).toBeDefined();
		
		$("#polarity").text(data.polarity);
	    $("#subjectivity").text(data.subjectivity);
	    $("#summary").text(data.text);
	})
	.then(data => {
		expect($("#polarity").text()).not.toBeNull();
		expect($("#subjectivity").text()).not.toBeNull();
		expect($("#summary").text()).not.toBeNull();
		expect($("#result-label").text()).toBeDefined();
		expect($("#polarity").text()).toBeDefined();
		expect($("#subjectivity").text()).toBeDefined();
		expect($("#summary").text()).toBeDefined();
		expect($("#result-label").text()).not.toBe("");
		expect($("#polarity").text()).not.toBe("");
		expect($("#subjectivity").text()).not.toBe("");
		expect($("#summary").text()).not.toBe("");
	});
	
});


/*
test("Check the POST request to Aylien API with an URL", () => {
	$("#my-url").val("https://fr.wikipedia.org/");	
	handleSubmitURL({preventDefault: jest.fn()}).then(() => {
		// Can't acces to DOM
	});
});
*/
