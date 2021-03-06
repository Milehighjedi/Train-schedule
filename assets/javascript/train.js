
var config = {
    apiKey: "AIzaSyAzciWiGLq_OgoxnHR40OeJWBQdDH4rzV8",
    authDomain: "train-project-ae265.firebaseapp.com",
    databaseURL: "https://train-project-ae265.firebaseio.com",
    projectId: "train-project-ae265",
    storageBucket: "train-project-ae265.appspot.com",
    messagingSenderId: "617208445"
  };
  firebase.initializeApp(config);


var database = firebase.database();


$('#addTrainBtn').on("click", function () {


    var name = $('#nameInput').val().trim();
    var destination = $('#destInput').val().trim();
    var firstTrain = $('#firstTrainInput').val().trim();
    var frequency = $('#freqInput').val().trim();


    var newTrain = {
        name: name,
        dest: destination,
        first: firstTrain,
        freq: frequency
    }


    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.dest);
    console.log(newTrain.first);
    console.log(newTrain.freq);


    $('#nameInput').val("");
    $('#destInput').val("");
    $('#firstTrainInput').val("");
    $('#freqInput').val("");

    return false;
});


database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());


    var name = childSnapshot.val().name;
    var destination = childSnapshot.val().dest;
    var firstTrain = childSnapshot.val().first;
    var frequency = childSnapshot.val().freq;


    console.log(name);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);


    var firstTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);


    var currentTime = moment();
    console.log("CURRENT TIME:" + moment(currentTime).format("HH:mm"));


    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);


    var tRemainder = diffTime % frequency;
    console.log(tRemainder);


    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);


    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


    $("#trainTable > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");

});
