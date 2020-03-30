var express = require("express");

var app = express();

app.get("/", function(req,res){
    res.send("Hi there,welcome to my assignment");

});

app.get("/speak/:animal", function(req,res){
    var sounds = {
        pig: "Oink",
        dog: "Woof",
        cat: " I hate uh"
    }
    var animal = req.params.animal.toLowerCase();
    var sound = sounds[animal];
    
    res.send("THE " + animal + "says" + sound);

});

app.get("/repeat/:message/:times",function(req,res){
    var message = req.params.message;
    var times = Number(req.params.times);
    var result ="";

    for(var i=0;i< times;i++){

        result =+ message+ "";
    }
    res.send(result);
});

app.listen(3000, function(){
    console.log("server has started");
});