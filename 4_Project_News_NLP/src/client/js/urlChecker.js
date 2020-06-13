const URLregex = new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)
// from https://www.regextester.com/94502

function checkForURL(inputUrl) {
	console.log("::: Running checkForURL :::", inputUrl);
    if(URLregex.test(inputUrl)) {
        return true;
    } 
	else {
        return false;
    }
}

export { checkForURL }
