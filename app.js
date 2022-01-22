//createMap
async function mapHandle(){

     function getCoords(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(createMap)
        }else{
            x.innerHTML = "Geolocation not supported"
        }
    
     }

 // Add OpenStreetMap tiles:
function createMap(position){
   let map= L.map("map").setView([position.coords.latitude, position.coords.longitude],15)

let markers = []
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoicXVhZHJpbDIwMTAiLCJhIjoiY2t5cGhhdHh1MGE1ODJwbGVmZnJtcmhyciJ9.kRWV_9MKMOE3_i5pAO10Vg'
}).addTo(map);
    
mapGeo(position.coords)
    
        


//business addEventListener
let businessId = document.getElementById('business')
    businessId.addEventListener('submit', () => {
    for(let i=0; i<markers.length; i++){
        markers[i].remove()
    }
    markers =[]
    businessId.value;
    getBusinesses(position,businessId.value)
    })
    
//forsquare API
async function getBusinesses(position, placeType){
      
    let response = await fetch("https://api.foursquare.com/v3/places/search?query=coffee%2Chotel%2Crestaurant%2Cmarket%2Chospital&ll=41.87%2C-87.62&limit=5",{
            method: 'GET',
            headers: { Accept: "application/json", Authorization: 'fsq3wa+zNis0St4yJ2l9RD0PCGsLB+NSW1ejYXdpEN4b1Zs='},})
        let data = await response.json();
        const playlist = data.results
        console.log(playlist)
        for(let i=0; i<playlist.length; i++){
            markers.push(markMap(playlist[i]).geocodes.main)
        }
     }

    }
    function mapGeo(position){
        
        return L.marker([position.latitude, position.longitude]).bindPopup('<p1><b>You are here</b></p1>').openPopup();
     }

    getCoords()
}

mapHandle()

