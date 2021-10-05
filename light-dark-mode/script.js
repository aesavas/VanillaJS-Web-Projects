const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById('nav');
const toggleIcon = document.getElementById('toggle-icon');
const img1 = document.getElementById('image1');
const img2 = document.getElementById('image2');
const img3 = document.getElementById('image3');
const textBox = document.getElementById('text-box');

//! Dark Mode Styles
function darkMode(){
    nav.style.backgroundColor = 'rgb(0 0 0 / 50%)';
    textBox.style.backgroundColor = 'rgb(255 255 255 / 50%)';
    toggleIcon.children[0].textContent = 'Dark Mode';
    toggleIcon.children[1].classList.remove('fa-sun');
    toggleIcon.children[1].classList.add('fa-moon');
    img1.src = 'img/undraw_proud_coder_dark.svg';
    img2.src = 'img/undraw_feeling_proud_dark.svg';
    img3.src = 'img/undraw_conceptual_idea_dark.svg';
}

//! Light Mode Styles
function lightMode(){
    nav.style.backgroundColor = 'rgb(255 255 255 / 50%)';
    textBox.style.backgroundColor = 'rgb(0 0 0 / 50%)';
    toggleIcon.children[0].textContent = 'Light Mode';
    toggleIcon.children[1].classList.remove('fa-moon');
    toggleIcon.children[1].classList.add('fa-sun');
    img1.src = 'img/undraw_proud_coder_light.svg';
    img2.src = 'img/undraw_feeling_proud_light.svg';
    img3.src = 'img/undraw_conceptual_idea_light.svg';
}

String.prototype.capitalize = function(){
    return this.charAt(0).toUpperCase() + this.slice(1);
}

//! Dark & Light Mode Change in one function
function switchLightDark(theme){
    nav.style.backgroundColor = (theme === "dark") ? 'rgb(0 0 0 / 50%)' : 'rgb(255 255 255 / 50%)';
    textBox.style.backgroundColor = (theme === "dark") ? 'rgb(255 255 255 / 50%)' : 'rgb(0 0 0 / 50%)';
    toggleIcon.children[0].textContent = `${theme.capitalize()} Mode`;
    toggleIcon.children[1].classList.remove(`fa-${(theme === "dark") ? "sun" : "moon"}`);
    toggleIcon.children[1].classList.add(`fa-${(theme === "dark") ? "moon" : "sun"}`);
    img1.src = `img/undraw_proud_coder_${theme}.svg`;
    img2.src = `img/undraw_feeling_proud_${theme}.svg`;
    img3.src = `img/undraw_conceptual_idea_${theme}.svg`;
}

//* Switch Theme Dinamically
function switchTheme(event) {
    if(event.target.checked){
        document.documentElement.setAttribute('data-theme', 'dark');
        //darkMode();
        switchLightDark('dark');
        localStorage.setItem('theme', 'dark');
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
        //lightMode();
        switchLightDark('light');
        localStorage.setItem('theme', 'light');
    }
}

//* Event Listener
toggleSwitch.addEventListener('change', switchTheme);

//* Check local storage for theme
const currentTheme = localStorage.getItem('theme');
if(currentTheme){
    document.documentElement.setAttribute('data-theme', currentTheme);
    if(currentTheme === "dark"){
        toggleSwitch.checked = true;
        switchLightDark('dark');
    }
}