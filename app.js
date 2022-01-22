//createMap
async function mapHandle(){

     async function getCoords(){
        pos = await new Promise((resolve, reject) => {
         navigator.geolocation.getCurrentPosition(resolve, reject)
     })
     return [pos.coords.latitude, pos.coords.longitude]
    }

function createMap(position){
const map = L.map('map').setView([position.coords.latitude, position.coords.longitude],20);
let markers = []
// Add OpenStreetMap tiles:
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoicXVhZHJpbDIwMTAiLCJhIjoiY2t5cGhhdHh1MGE1ODJwbGVmZnJtcmhyciJ9.kRWV_9MKMOE3_i5pAO10Vg'
}).addTo(map);
        markMap(position.coords)
const marker = L.marker([position.coords.latitude, position.coords.longitude]).addTo(map).bindPopup('<p1><b>You are here</b></p1>').openPopup()
        
//business addEventListener
let businessId = document.getElementById('business')
    businessId.addEventListener('submit', (event) => {
    for(let i=0; i<markers.length; i++){
        event.preventDefault()
    }
    markers =[]
    businessId.value;
    getBusinesses(position,businessId.value)
    })
}


async function getBusinesses(business){
      
    let response = await fetch("https://api.foursquare.com/v3/places/search?query=coffee%2Chotel%2Crestaurant%2Cmarket%2Chospital&ll=41.87%2C-87.62&limit=5",{
            method: 'GET',
            headers: { Accept: "application/json"},})
        let data = await response.json();
        const playlist = result.results
        console.log(playlist)
        for(let i=0; i<playlist.length; i++){
            markers.push(markMap(playlist[i]).geocodes.main)
        }
     }


}

mapHandle()

