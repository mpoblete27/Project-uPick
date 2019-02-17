// Initialize Firebase



var config = {
    apiKey: "AIzaSyBMHL9um8Nsoy3vj8CPWIZuaG3QvKDgYys",
    authDomain: "upick-d5758.firebaseapp.com",
    databaseURL: "https://upick-d5758.firebaseio.com",
    projectId: "upick-d5758",
    storageBucket: "upick-d5758.appspot.com",
    messagingSenderId: "989534447107"
  };
  firebase.initializeApp(config);

  // Create a variable to reference the database
  var database = firebase.database();
  // -----------------------------
  // connectionsRef references a specific location in our database.
  // All of our connections will be stored in this directory.
  var connectionsRef = database.ref("/connections");
  // '.info/connected' is a special location provided by Firebase that is updated
  // every time the client's connection state changes.
  // '.info/connected' is a boolean value, true if the client is connected and false if they are not.
  var connectedRef = database.ref(".info/connected");
  // When the client's connection state changes...
  connectedRef.on("value", function (snap) {
    // If they are connected..
    if (snap.val()) {
      // Add user to the connections list.
      var con = connectionsRef.push(true);
      // Remove user from the connection list when they disconnect.
      con.onDisconnect().remove();
    }
  });
  // When first loaded or when the connections list changes...
  connectionsRef.on("value", function (snap) {
    // Display the viewer count in the html.
    // The number of online users is the number of children in the connections list.
    $("#connected-viewers").text(snap.numChildren());
  });

  var playersRef = database.ref("players");
  var cuisineButton;
  var finalButton;
  var currentPlayers = null;
  var playerTurns = 2; //*** this will decrease to 0  !!!!!!!!!!****************
  var playerNum = false;
  var playerOneExists = false;
  var playerTwoExists = false;
  var playerThreeExists = false;
  var playerFourExists = false;
  var gameStarted = false;


$(document).ready( function(){
$("#eliminate").hide();
$(".cuisine-display").hide();
$("#map").hide();
$(".result-div").hide();
$("#end-page").hide();
    resetGameForAll();
})
  // Click join button event for dynamically added <button> elements
  $(document).on("click", "#playerOne", function () {

  
    $("#playerOne").css("background-color", "red");
    $("#playerOne").css("border-radius", "50%");
 


    // $(".player-one-modal").modal("show");
    playerOneExists = true;
    getInGame();
  });

  $(document).on("click", "#playerTwo", function () {
    $("#playerTwo").css("background-color", "yellow");
    $("#playerTwo").css("border-radius", "50%");


    // $(".player-two-modal").modal("show");
    playerTwoExists = true;
    getInGame();
  });
  $(document).on("click", "#playerThree", function () {
    $("#playerThree").css("background-color", "green");
    $("#playerThree").css("border-radius", "50%");
    // $(".player-three-modal").modal("show");
    playerThreeExists = true;
    getInGame();
  });
  $(document).on("click", "#playerFour", function () {
    $("#playerFour").css("background-color", "blue");
    $("#playerFour").css("border-radius", "50%");

    playerFourExists = true;
    getInGame();
  });








  // //////////Function to get in the game
  function getInGame() {
    if (playerOneExists && playerTwoExists && playerThreeExists && playerFourExists) {
      gameStarted = true;
   
      $(".playersContainer").addClass("div-animate");
      $("#eliminate").show();

      setTimeout(function(){
        $(".cuisine-display").show();
      },500);
    }
  }


  //////////////////////// MAIN GAME //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function resetGameForAll() {
    var cuisines = [{ food: 'American', eliminated: false },
    { food: 'Chinese', eliminated: false },
    { food: 'Filipino', eliminated: false },
    { food: 'Indian', eliminated: false },
    { food: 'Italian', eliminated: false },
    { food: 'Japanese', eliminated: false },
    { food: 'Korean', eliminated: false },
    { food: 'Thai', eliminated: false },
    { food: 'Mexican', eliminated: false },
    { food: 'Vietnamese', eliminated: false }];
    var players = [{ player: 'playerOne', playerOneExists: false, turns: 0 },
    { player: 'playerTwo', playerTwoExists: false, turns: 0 },
    { player: 'playerThree', playerThreeExists: false, turns: 0 },
    { player: 'playerFour', playerFourExists: false, turns: 0 }
    ];
    database.ref('/cuisines').set({
      cuisines: cuisines
    });
    createButtons(cuisines)
  }




  var winner;
  var cuisineButton;
  var finalButton;

  database.ref("/cuisines").on("value", function (snapshot) {

    

    cuisines = snapshot.val().cuisines;
    var counter = 0;
    var remainingStuff = [];
    cuisines.forEach(function (cuisine) {
      if (!cuisine.eliminated) {
        counter++
        remainingStuff.push(cuisine.food);
      }
    });
    if (counter === 1) {
      winner = remainingStuff.pop()
      $('.cuisine-display').addClass("div-animate");
      $(".current-players-div").addClass("div-animate");
      $("#eliminate").addClass("div-animate");

      setTimeout(function(){
        $(".result-div").show();
      },500);





      $('#correct-answer-id').append(winner);
        if (winner === "Korean") {
          $('.foodImg').append("<img src='assets/korean-100.jpg' width='375px'>");
                  }
        else if (winner === "Chinese") {
          $('.foodImg').append("<img src='assets/chinese-100.jpg' width='375px'>");
                  }
        else if (winner === "American") {
          $('.foodImg').append("<img src='assets/american-100.jpg' width='375px'>");
                  }
        else if (winner === "Filipino") {
          $('.foodImg').append("<img src='assets/fil-100.jpg' width='375px'>");
                  }
        else if (winner === "Indian")  {
          $('.foodImg').append("<img src='assets/indian-100.jpg' width='375px'>");
                  }
       else  if (winner === "Italian")  {
        $('.foodImg').append("<img src='assets/italian_1-100.jpg' width='375px'>");
                  }

        else if (winner === "Japanese")  {
        $('.foodImg').append("<img src='assets/japanese-100.jpg' width='375px'>");
        }
        
        else if (winner === "Thai")  {
          $('.foodImg').append("<img src='assets/thai_1-100.jpg' width='375px'>");
                  }
        else if (winner === "Mexican")  {
          $('.foodImg').append("<img src='assets/mexican-100.jpg' width='375px'>");
                  }
       else if (winner === "Vietnamese") {
        $('.foodImg').append("<img src='assets/viet_1-100.jpg' width='375px'>");
                  }

 
      $(document).on("click", "#o", function () {
        $("#map").show();
        initMap();
        $(".xo-display").hide();
      })

    }
    createButtons(cuisines);
  });
  // click handler to start game and generate cuisine buttons
  $('#start-game').on('click', function () {
    resetGameForAll();
  });










  //when user decides to eliminate one of the cuisines
  $(document).on('click', '.cuisine-button', function () {
  if (!gameStarted) {
    $(".wait-modal").modal("show");

  } else {
  var elimCu = $(this).attr("data-name");
  for(var i = 0; i< cuisines.length; i++){
      if(elimCu === cuisines[i].food){
          cuisines[i].eliminated = true;
          database.ref("/cuisines").set({
              cuisines: cuisines
          })
      }
      }
  }
});

  function createButtons(cuisines) {
    $('.cuisine-display').empty();
    for (var i = 0; i < cuisines.length; i++) {
      if (!cuisines[i].eliminated) {
        cuisineButton = $('<button>');
        cuisineButton.addClass('cuisine-button');
        cuisineButton.attr('data-name', cuisines[i].food);
        cuisineButton.text(cuisines[i].food);
        $('.cuisine-display').append(cuisineButton);
        $(".cuisine-display").append("<br>");
      } else {
        cuisineButton = $('<button>');
        cuisineButton.addClass('cuisine-button strike');
        cuisineButton.attr('data-name', cuisines[i].food);
        cuisineButton.text(cuisines[i].food);
        $('.cuisine-display').append(cuisineButton);
        $(".cuisine-display").append("<br>");
      }
    }
  };

  function gameOver() {
    resetGameForAll();
  }




  //////////////////////// RESULTS MAP //////////////////////////////////////////////////////////////////////////////////////////////////////////////////




  var map, infoWindow;
  var map2;
  var userLat;
  var userLng;
  var userLoc;
  var service;
  var pos;
  var finalFinalPick;
  var finalPicks = [];
  var currentPlaceID;
  var currentPlaceName;

  $('#confirm-modal').modal({
    keyboard: false
  });

  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: new google.maps.LatLng(userLat, userLng),
      zoom: 15
    });
    infoWindow = new google.maps.InfoWindow;

    console.log(userLoc);


    //GET USER LOCATION
    if (navigator.geolocation) {
      console.log(navigator.geolocation)
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position)
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        userLat = pos.lat;
        userLng = pos.lng;
        console.log(userLat);
        console.log(userLng);
        console.log(pos);


        //SHOWS USER POSITION
        infoWindow.setPosition(pos);
        infoWindow.setContent('<p id="uAreHere">YOU<br>ARE<br>HERE<br><p>');
        infoWindow.open(map);
        map.setCenter(pos);


        infowindow = new google.maps.InfoWindow();
        service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: pos,
          radius: 10000,
          type: ['restaurant'],
          keyword: winner,

        }, callback);

        function callback(results, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
              createMarker(results[i]);
            }
            finalPicks.push(results);
          }
        }



        function createMarker(place) {
          var placeLoc = place.geometry.location;
          var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
          });

          ///CLICK RANDOM BUTTON TO PICK A RANDOM OPTION THEN GO TO CONFIRM ALERT
          //  var randomButton = $('<button>');
          //         randomButton.addClass('pick-random');
          //         randomButton.append('Randomly Select');
          //         $('.pick-random-btn').append(randomButton);


          // $(document).on("click", ".pick-random", function (){
          //       function pickRandom(finalPicks) {
          //      finalFinalPick = finalPicks[Math.floor(Math.random() * finalPicks.length)];
          //      $('#final-final-id').text("Looks like you're eating: " + finalFinalPick);

          //     }
          //    })



          google.maps.event.addListener(marker, 'click', function () {
            $(".infoInfo").empty();
            // var selectBtn = $('<button>');
            //     selectBtn.addClass("selectButton");
            //     selectBtn.text("Select This Restaurant");

            currentPlaceID = place.place_id;
            currentPlaceName = place.name;
            console.log(currentPlaceID);
            infowindow.setContent("<p class='mapTag'>" + place.name + "</p>");

         

            $(".infoInfo").append("<p id='placeTitle'>" + place.name + "<p id='openClose'></p>" + 
               "<p id='vicinity'>" + place.vicinity + "<p>" +  place.rating +  "<p id='priceLvl'></p>" +  "<br>" 
              + "<button id='goHere'>GO</button>" + "<br>" + "<a href ='index.html' class='xo' id='x2' role='button'>START OVER</a>" );

             if (place.opening_hours.open_now == true) {
              $("#openClose").append("OPEN");
            
              $(".infoInfo").css('background-color', '#B88B37');
            }

           if (place.opening_hours.open_now == false) {
              $("#openClose").append("CLOSED")
              $("#goHere").hide();
              $("#x2").show();
              $(".infoInfo").css('background-color', '#CD3C1D')
            }

             if (place.price_level === 1) {
              $("#priceLvl").append("$")
             }
             if (place.price_level === 2) {
              $("#priceLvl").append("$$")
             }
             if (place.price_level === 3) {
              $("#priceLvl").append("$$$")
             }
             if (place.price_level === 4) {
              $("#priceLvl").append("$$$$")
             }
          
          infowindow.open(map, this);

            $("#goHere").on('click', function () {

              // $('#confirm-modal').modal('show');
              $(".selected-restaurant-name").text(currentPlaceName);

              $("#goHere").on("click", function () {
                $("#end-page").show();
                // $('#confirm-modal').modal('hide');
                $("#goHere").hide();
                console.log("egg")
                $("#map").hide(); 
                $(".infoInfo").css('transform', 'translateY(-375px)');
                $(".infoInfo").css('background-color', 'rgba(184, 139, 55, 0.75)');

                $(document).on("click", ".done-btn", function () {
                  resetGameForAll();
                })



              })

            });
          });
        }
      });
    }
  }



























