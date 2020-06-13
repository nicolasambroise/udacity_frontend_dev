import { checkForURL } from '../urlChecker';

test('Check if URL are valid', () => {
    const valid_urls = [
		"google.fr",
		"www.google.fr",
		"http://google.fr",
		"https://google.fr",
		"http://www.google.fr",
		"https://www.google.fr",
		"google.fr/rep1",
		"google.fr/rep1/",
		"google.fr/rep1/rep2",
		"google.fr/rep1/index.html",
		"google.fr/rep1?a=b",
		"google.fr/rep1?a=b&c=d",
		"google.fr/rep1/index.html?a=b&c=d",
		"google.fr/rep1/#anchor",
		"google.fr/rep1/index.html#anchor",
		"google.fr:80"
	];
	
	valid_urls.forEach(valid_url => {
	  //console.log("valid " +valid_url);
      expect(checkForURL(valid_url)).toBe(true);
    });
})

test('Check if URL are not valid', () => {
   const error_urls = [
		"google",
		"http:/google.fr",
		"http//google.fr",
		"https:google.fr",
		"htp://www.google.fr",
		"htts://www.google.fr",
		"google/rep1",
		"google/rep1/",
		"/google/rep1",
		"./google/rep1/",
	];
	
    error_urls.forEach(error_url => {
	  //console.log("not valid " +error_url);
      expect(checkForURL(error_url)).toBe(false);
    });
})