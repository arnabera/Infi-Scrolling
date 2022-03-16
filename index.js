const imgContainer = document.getElementById('img-container');
const loader = document.getElementById('loader');
let photosArray =[];
let ready = false;
let imagesLoaded = 0;
let totalImage = 0;

// Unsplash API
const count = 30;
const apiKey = 'NriIVPGcmFHwIkxOhteoz9vCj0BkW5t6lo2S3cLpFvk';

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// Helper function to setAttributes to DOM 
function setAttributes(element,attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key])
    }

}

// check if all the images were loaded
function imageLoaded(){
    imagesLoaded ++;
    if(imagesLoaded === totalImage){
        ready = true;
        loader.hidden = true;
    }
}

// Create element for link & photos, add to DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImage = photosArray.length;
    // Run function for each object in photos array
    photosArray.forEach((photo)=>{
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item,{
            href:photo.links.html,
            target:'_blank',
        });

        // Create <img> to link to Unsplash
        const img = document.createElement('img');   
        setAttributes(img,{
            src:photo.urls.regular,
            // alt:photo.alt_description,
            title:photo.alt_description,
        });
       
        // Event Listner , when each is finished
        img.addEventListener('load',imageLoaded) 

        // Put <img> int <a> and then put both inside the imgContainer
        item.appendChild(img);
        imgContainer.appendChild(item)
    });

} 

// Get photos from Unsplash API

async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }
    catch(error){
        // Catch Error
    }
}

// Check to see if scrolling near bottom of the page ,Load new photos 
window.addEventListener('scroll',()=>{
    if(window.innerHeight+window.scrollY >= document.body.offsetHeight -1000 && ready){
        ready = false
        getPhotos()

    }
})


// // onLoad 
getPhotos()

