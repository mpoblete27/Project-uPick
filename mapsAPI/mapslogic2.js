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

function getLocation() {
   if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(showPosition, positionError);
     console.log(getLocation);
   //   console.log(getLocation/coord);
   } else {
     console.log("Geolocation is not supported by this browser.");
   }
 }

 
// this makes the map and centers user's viewport in that area
var map;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 37.8716, lng: -122.2727},
          zoom: 14
        });
      }


      // to get user's location
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
         console.log(position)
         // Success, can use position.
         console.log("Your position is: " + position);
       }
       
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