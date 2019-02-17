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


   $(document).ready(function() {
       $("#pressing").hide();
   })

   $("#start").mouseenter(function() {
       $("#start").hide();
       $("#pressing").show();
   })

   $("#pressing").mouseleave(function() {
       $("#start").show();
       $("#pressing").hide();
   })


   
    $('#start-game').on('click', function () {
        resetGameForAll();
    });

    function resetGameForAll(){
        var cuisines = [{food: 'American', eliminated: false },
                {food: 'Chinese', eliminated: false },
                {food: 'Filipino', eliminated: false },
                {food: 'Indian', eliminated: false },
                {food: 'Italian', eliminated: false },
                {food: 'Japanese', eliminated: false },
                {food: 'Korean', eliminated: false },
                {food: 'Thai', eliminated: false },
                {food: 'Mexican', eliminated: false },
                {food: 'Vietnamese', eliminated: false }];

        database.ref('/cuisines').set({
            cuisines: cuisines
        });
        createButtons(cuisines)
    }