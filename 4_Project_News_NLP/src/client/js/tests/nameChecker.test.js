import { checkForName } from '../nameChecker';

test('Check if Name is Capitain', () => {
    const valid_capitain = [
		"Marvel",
		"America",
		"Kirk"
	];
	
	valid_capitain.forEach(name => {
      expect(checkForName(name)).toBe(true);
    });
})

test('Check if Name is not Capitain', () => {
   const error_capitain = [
		"hulk",
		"spiderman",
		"joker"
	];
	
    error_capitain.forEach(name => {
      expect(checkForName(name)).toBe(false);
    });
})