function checkForName(inputText) {
    console.log("::: Running checkForName :::", inputText);
    let names = [
        "Picard",
        "Janeway",
        "Kirk",
        "Archer",
        "Georgiou",
		"America",
		"Marvel"
    ]

    if(names.includes(inputText)) {
        alert("Welcome, Captain!");
		return true;
    }
	else {
        return false;
    }
}

export { checkForName }
