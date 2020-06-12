function handleSubmitTestServer(event) {
    event.preventDefault()
	document.getElementById("btn-submit-test-server").classList.add("buttonload");

    console.log("::: Form Submitted :::")
	console.log("Call Server TEST");
		
	// TEST Server : Display "this is a message" in the view
	
    fetch('http://localhost:9000/test')
    .then(res => res.json())
    .then(function(res) {
		alert(res.message);
		document.getElementById("btn-submit-test-server").classList.remove("buttonload");
    });
}

function handleSubmitTestApi(event) {
    event.preventDefault()
	document.getElementById("btn-submit-test-api").classList.add("buttonload");

    console.log("::: Form Submitted :::")
	console.log("Call TEST API");
		
	// TEST API : Display the result of the following sentence 'John is a very good football player!'
	fetch("http://localhost:9000/test", {
		method: "POST",
		mode: "cors",
		headers: {
		  "Content-Type": "application/json"
		},
		body: JSON.stringify()
	})
	.then(res => res.json())
    .then(data => {
      document.getElementById("polarity").innerHTML = data.polarity;
      document.getElementById("subjectivity").innerHTML = data.subjectivity;
      document.getElementById("polarity_confidence").innerHTML =
        data.polarity_confidence;
      document.getElementById("subjectivity_confidence").innerHTML =
        data.subjectivity_confidence;
      document.getElementById("summary").innerHTML = data.text;
	  document.getElementById("result").style.display = 'flex';
	  document.getElementById("btn-submit-test-api").classList.remove("buttonload");
	  document.getElementById("result").scrollIntoView({ behavior: 'smooth', block: 'end'});
    });
	
}

export { handleSubmitTestServer, handleSubmitTestApi }
