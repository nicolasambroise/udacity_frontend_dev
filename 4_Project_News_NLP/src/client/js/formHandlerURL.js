function handleSubmitURL(event) {
	event.preventDefault();
	
	// check what URL was put into the form field
	const url = document.getElementById("my-url").value;
	document.getElementById("result-label").innerHTML = url;
	if (!url){
		alert("You should put an URL in the input field !");
		return;
	}
	document.getElementById("my-url").value = "";
	document.getElementById("btn-submit-url").classList.add("buttonload");
	
	console.log("::: Form Submitted :::")
	console.log("Call Aylien : "+url);
	
	fetch("http://localhost:9000/aylien", {
		method: "POST",
		mode: "cors",
		headers: {
		  "Content-Type": "application/json"
		},
		body: JSON.stringify({ 'url': url })
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
	  document.getElementById("btn-submit-url").classList.remove("buttonload");
	  document.getElementById("result").scrollIntoView({ behavior: 'smooth', block: 'end'});
    });
}

export {handleSubmitURL};