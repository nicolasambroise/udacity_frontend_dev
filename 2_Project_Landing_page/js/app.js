/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

const sections = document.getElementsByTagName("section");
const navbar = document.getElementById("navbar__list");
let current_section_id = ""; // current viewed section on screen (top of viewport is in section) 
const section_offsetTop_margin = 40; // offset in px to ajust the top of viewport with the navbar element


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the navbar
function createNavbar() {
    for (let i = 0; i < sections.length; i++) {
        navbar.appendChild(createNavbarItem(sections[i]))
    }
}

// build the navbar items
function createNavbarItem(navigationItem) {
    const div_elem = document.createElement("div");
    const li_elem = document.createElement("li");
	div_elem.classList.add("menu__link");
    div_elem.appendChild(document.createTextNode(navigationItem.dataset.nav));
	li_elem.appendChild(div_elem);
	li_elem.setAttribute("data-nav", navigationItem.id);
    return li_elem;
}

// Add class 'active' to section when near top of viewport
function changeNavbarActive() {
	const navbarItems = document.getElementsByClassName("menu__link");
    const activeSection = getActiveSection();
	
	// change classes only if change section
	if(activeSection.id != current_section_id){
		
		console.log("NEW activeSectionId:"+ activeSection.id);
		
		current_section_id = activeSection.id;
		const activeNavbarItem = document.querySelector('#navbar__list li[data-nav="' + current_section_id + '"] .menu__link');		
		
		// remove navbar active class
		for (let i = 0; i < navbarItems.length; i++) {
			   navbarItems[i].classList.remove('menu__link__active');
		}
		// remove section active class
		for (let i = 0; i < sections.length; i++) {
			   sections[i].classList.remove('your-active-class');
		}
		// add navbar active class
		activeNavbarItem.classList.add('menu__link__active');
		
		// add section active class
		activeSection.classList.add('your-active-class');
	}
}

function getActiveSection(){
	let activeSection = sections[0];
	let section_top_position = 0;
	
	// get current scroll position
	const currentPosition = window.scrollY;
	
	for (let i = sections.length - 1; i >= 0; i--) {
		// get selected section top position (offsetTop because of navbar and css padding)
		section_top_position = sections[i].offsetTop - section_offsetTop_margin;
		if(currentPosition >= sections[i].offsetTop - section_offsetTop_margin){
			activeSection = sections[i];
			break;
		}
	}
	return activeSection;
}

// Scroll to anchor ID using scrollTO event (when navbar item click)
function addSmoothScroll() {
    const navbarItems = document.getElementsByClassName("menu__link");
	let navbarTarget;
    for (let i = 0; i < navbarItems.length; i++) {
        navbarItems[i].parentElement.addEventListener("click", () => {
			//console.log(navbarItems[i].parentElement);
			navbarTarget = document.getElementById(navbarItems[i].parentElement.getAttribute("data-nav"));
			navbarTarget.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"}); // smoth-scroll
		});
    }
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
createNavbar();

// Scroll to section on link click
addSmoothScroll();

// Set sections as active
changeNavbarActive();
window.addEventListener('scroll',() => changeNavbarActive());


