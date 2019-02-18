/////////////////////// INITIALIZE FIREBASE /////////////////////// 
var config = {
    apiKey: "AIzaSyBMHL9um8Nsoy3vj8CPWIZuaG3QvKDgYys",
    authDomain: "upick-d5758.firebaseapp.com",
    databaseURL: "https://upick-d5758.firebaseio.com",
    projectId: "upick-d5758",
    storageBucket: "upick-d5758.appspot.com",
    messagingSenderId: "989534447107"
};
firebase.initializeApp(config);


var database = firebase.database();

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

/////////////////////// UPICK /////////////////////// 



var playersRef = database.ref("players");
var cuisineButton;
var finalButton;
var currentPlayers = null;
var playerTurns = 2; 
var playerNum = false;
var playerOneExists = false;
var playerTwoExists = false;
var playerThreeExists = false;
var playerFourExists = false;
var gameStarted = false;

/////////////////////// PART 1 SETUP /////////////////////// 
$(document).ready(function () {
    $("#eliminate").hide();
    $(".cuisine-display").hide();
    $("#map").hide();
    $(".infoInfo").hide();
    $(".result-div").hide();
    $("#end-page").hide();
    resetGameForAll();
})

/////////////////////// PLAYERS /////////////////////// 

// Click join button event for dynamically added <button> elements
$(document).on("click", "#playerOne", function () {


    $("#playerOne").css("background-color", "red");
    $("#playerOne").css("color", "white");
    $("#playerOne").css("border-radius", "50%");



    // $(".player-one-modal").modal("show");
    playerOneExists = true;
    getInGame();
});

$(document).on("click", "#playerTwo", function () {
    $("#playerTwo").css("background-color", "yellow");
    $("#playerTwo").css("color", "white");
    $("#playerTwo").css("border-radius", "50%");


    // $(".player-two-modal").modal("show");
    playerTwoExists = true;
    getInGame();
});
$(document).on("click", "#playerThree", function () {
    $("#playerThree").css("background-color", "green");
    $("#playerThree").css("color", "white");
    $("#playerThree").css("border-radius", "50%");
    // $(".player-three-modal").modal("show");
    playerThreeExists = true;
    getInGame();
});
$(document).on("click", "#playerFour", function () {
    $("#playerFour").css("background-color", "blue");
    $("#playerFour").css("color", "white");
    $("#playerFour").css("border-radius", "50%");

    playerFourExists = true;
    getInGame();
});








/////////////////////// ENTER GAME /////////////////////// 
function getInGame() {
    if (playerOneExists && playerTwoExists && playerThreeExists && playerFourExists) {
        gameStarted = true;

        $(".playersContainer").addClass("div-animate");
        $("#eliminate").show();

        setTimeout(function () {
            $(".cuisine-display").show();
        }, 500);
    }
}


/////////////////////// RESET GAME FUNCTION /////////////////////// 

function resetGameForAll() {
    var cuisines = [{ food: "american",flag: "🇺🇸", eliminated: false },
    { food: "chinese", flag: "🇨🇳",eliminated: false },
    { food: "filipino",flag: "🇵🇭", eliminated: false },
    { food: "indian",flag: "🇮🇳", eliminated: false },
    { food: "italian",flag: "🇮🇹", eliminated: false },
    { food: "japanese",flag: "🇯🇵", eliminated: false },
    { food: "korean",flag: "🇰🇷", eliminated: false },
    { food: "thai", flag: "🇹🇭", eliminated: false },
    { food: "mexican", flag: "🇲🇽",eliminated: false },
    { food: "vietnamese",flag:"🇻🇳", eliminated: false }];
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



/////////////////////// WINNER VARIABLE /////////////////////// 


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
        console.log(winner);
        $('.cuisine-display').addClass("div-animate");
        $(".current-players-div").addClass("div-animate");
        $("#eliminate").addClass("div-animate");

        setTimeout(function () {
            $(".result-div").show();
            $("#followA").hide();
            $("#followB").hide();
        }, 500);





        $('#correct-answer-id').append(winner);
        if (winner === "korean") {
            $('.foodImg').append( "<img src='assets/korean-100.jpg' width='375px'>");
        }
        else if (winner === "chinese") {
            $('.foodImg').append("<img src='assets/chinese-100.jpg' width='375px'>");
        }
        else if (winner === "american") {
            $('.foodImg').append("<img src='assets/american-100.jpg' width='375px'>");
        }
        else if (winner === "filipino") {
            $('.foodImg').append("<img src='assets/fil-100.jpg' width='375px'>");
        }
        else if (winner === "indian") {
            $('.foodImg').append("<img src='assets/indian-100.jpg' width='375px'>");
        }
        else if (winner === "italian") {
            $('.foodImg').append("<img src='assets/italian_1-100.jpg' width='375px'>");
        }

        else if (winner === "japanese") {
            $('.foodImg').append("<img src='assets/japanese-100.jpg' width='375px'>");
        }

        else if (winner === "thai") {
            $('.foodImg').append("<img src='assets/thai_1-100.jpg' width='375px'>");
        }
        else if (winner === "mexican") {
            $('.foodImg').append("<img src='assets/mexican-100.jpg' width='375px'>");
        }
        else if (winner === "vietnamese") {
            $('.foodImg').append("<img src='assets/viet_1-100.jpg' width='375px'>");
        }


        /////////////////////// xo animation 
        $(document).on("click", "#o", function () {
            $("#map").show();
            initMap();
            $(".xo-display").hide();
            $(".foodImg").hide();
        })


        $("#o").mouseenter(function () {
            $("#followA").fadeIn();


            $("#o").mousemove(function (event) {

                $("#followA").offset({
                    left: event.pageX + 15,
                    top: event.pageY - 15

                })

            })
        })


        $("#o").mouseleave(function () {
            $("#followA").hide();
        })


        $("#x").mouseenter(function () {
            $("#followB").fadeIn();


            $("#x").mousemove(function (event) {

                $("#followB").offset({
                    left: event.pageX - 60,
                    top: event.pageY - 15

                })

            })
        })

        $("#x").mouseleave(function () {
            $("#followB").hide();
        })
        
    }

       /////////////////////// xo animation end



    createButtons(cuisines);
});


/////////////////////// START GAME /////////////////////// 
$('#start-game').on('click', function () {
    resetGameForAll();
});




$(document).on('click', '.cuisine-button', function () {
    if (!gameStarted) {
        $(".wait-modal").modal("show");

    } else {
        var elimCu = $(this).attr("data-name");
        for (var i = 0; i < cuisines.length; i++) {
            if (elimCu === cuisines[i].flag) {
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
            cuisineButton.addClass('cuisine-button cuisine-btn-inactive');
            cuisineButton.attr('data-name', cuisines[i].flag);
            cuisineButton.text(cuisines[i].flag);
            $('.cuisine-display').append(cuisineButton);

        } else {
            cuisineButton = $('<button>');
            cuisineButton.addClass('cuisine-button strike');

            cuisineButton.attr('data-name', cuisines[i].flag);
            cuisineButton.text(cuisines[i].flag);
            $('.cuisine-display').append(cuisineButton);

        }

        if (i === 1) {
            $(".cuisine-display").append("<br>");
        } else if (i === 3) {
            $(".cuisine-display").append("<br>");
        } else if (i === 5) {
            $(".cuisine-display").append("<br>");
        } else if (i === 7) {
            $(".cuisine-display").append("<br>");
        }

    }
};

function gameOver() {
    resetGameForAll();
}




/////////////////////// MAP /////////////////////// 


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

/////////////////////// RESULTS DIV /////////////////////// 

                    $(".infoInfo").show();
                    $(".infoInfo").append("<p id='placeTitle'>" + place.name + "<p id='openClose'></p>" +
                        "<p id='vicinity'>" + place.vicinity + "<p>" + place.rating + "<p id='priceLvl'></p>" + "<br>"
                        + "<button id='goHere'>GO</button>" + "<br>" + "<a href ='index.html' class='xo' id='x2' role='button'>START OVER</a>");

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

                    /////////////////////// FINAL PAGE /////////////////////// 

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


























