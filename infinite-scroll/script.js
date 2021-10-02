const imageContainer = document.querySelector('#image-container');
const loader = document.querySelector('#loader')

let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

//! Unsplah API Adress
const initialCount = 10;
const apiKey = 'BHslTFjE8dKQboXN-HcaRW45v8JP5u76F267xcCfHi4';
let apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;

//! Check if all images were loaded
function imageLoaded(){
    imagesLoaded++;
    console.log(imagesLoaded)
    if(imagesLoaded === totalImages){
        imagesLoaded = 0;
        loader.hidden = true;
        ready = true;
    }
}

//* Display Photos
function displayPhotos(){
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        //* Create <a> tag to link to Unsplash
        const aTag = document.createElement('a');
        setAttributes(aTag, {href:photo.links.html, target:'_blank'})
        //* Create <img> to display image
        const img = document.createElement('img');
        setAttributes(img, {src : photo.urls.regular, alt: photo.alt_description})
        img.addEventListener('load', imageLoaded);
        aTag.appendChild(img);
        imageContainer.appendChild(aTag);
    });
}

//* Helper Function To Set Attributes
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}

//* Get Photos From Unsplash API
async function getPhotos(){
    try {
        const response = await fetch(apiURL);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        alert(error);
    }
}

window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
})

getPhotos();