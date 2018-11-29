//  // to search nearby google maps by URL:
//  var apiKey = "AIzaSyBW2P5znpC7asNyzcITnoDRVOutOYjmPzU"
//  var yourLocation = "37.87205180956819,122.27128303469726" //golden bear as example location
//  var finalButton = "indian" //indian food as example
//  //returns area in JSON
//  var queryURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + yourLocation + "&radius=40233&type=restaurant&keyword=" +
//  finalButton + "&key=" + apiKey

//  function findPlaceFromQuery(){
//    console.log(queryURL)
//  };
//  findPlaceFromQuery();
 
    
//     // example: https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=YOUR_API_KEY


var userLat;
var userLong;


function getLocation() {
   if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(showPosition, positionError);
     console.log(getLocation);
   //   console.log(getLocation/coord);
   } else {
     console.log("Geolocation is not supported by this browser.");
   }
 }
       
function showPosition(position) {
  //console.log(position)
  // Success, can use position.
  console.log("Your position is: " + position);
  //setting user coordinates for the variables         
  userLat = position.coords.latitude;
  userLong = position.coords.longitude;
  console.log(userLat);
  console.log(userLong);
   //sending the coordinate variables defined here to a new functions called "directions" and when making the map
  directions(userLat, userLong);
  initMap(userLat, userLong);
}

       

//If user doesn't want to give access to location
function positionError(error) {
  if (error.PERMISSION_DENIED) {
    console.log("Error: permission denied");
    // Your custom modal here.
    showError('Geolocation is not enabled. Please enable to use this feature.');
  } else {
      // Handle other kinds of errors.
      console.log("Other kind of error: " + error);
    }
}
       
       function showError(message) {
         // TODO
       }
       
getLocation();
       
// this makes the map and centers user's viewport in that area
var map;
function initMap(newLat, newLong) {
  var center = new google.maps.LatLng(newLat, newLong);
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: newLat, lng: newLong},
    zoom: 14
  });
  var request = {
    location: center,
    radius: 24140,
    types: ["restaurant"]
  };
  //use google Places to search for "restaurant" on the map:
  var service = new google.maps.places.PlacesService(map);

  service.nearbySearch(request, callback);
}

//ensure PlacesService worked
function callback(results, status) {
  if(status === google.maps.places.PlacesService.OK){
    for (var i = 0; i < results.length; i++){
      createMarker(results[i]);
    }
  }
}

//put a map marker down on each restaurant in that area
function createMarker(place) {
  var placeLoc = place.geometry.location;
  var maker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });
}

//lat and long are parameters taken from showPosition function when it was fed/sent.
//this function won't be used until the coordinates have been defined in showPosition and sent to this function
function directions(lat, long){
  console.log(lat)
  console.log(long)
     }

//searching for restaurant nearby user's location
  