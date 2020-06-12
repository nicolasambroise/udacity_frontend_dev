function handleSubmitName(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('my-name').value;
	document.getElementById("result-label").innerHTML = formText;
	if (!formText){ 
		alert("You should put something in the input field !");
		return;
	}
	document.getElementById("my-name").value = "";
	document.getElementById("btn-submit-name").classList.add("buttonload");
	
    Client.checkForName(formText);

    console.log("::: Form Submitted :::")
	console.log("Call TEST : "+formText);
		
    fetch("http://localhost:9000/aylien", {
		method: "POST",
		mode: "cors",
		headers: {
		  "Content-Type": "application/json"
		},
		body: JSON.stringify({ 'text': formText })
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
		document.getElementById("btn-submit-name").classList.remove("buttonload");
		document.getElementById("result").scrollIntoView({ behavior: 'smooth', block: 'end'});
    })
}

export { handleSubmitName }
