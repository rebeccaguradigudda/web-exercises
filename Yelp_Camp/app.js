var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
    {name:"Greece", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTLrISara7MlGRE92xvfsc8ozx1lHQ-ap5x_ZfrPtcfNoEIZkPf&usqp=CAU"},
    {name:"Rome", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQuQKlR6Lf0AvPQ4wBknG2V0YM_NpvyaYF5LwHCrPAD_R5Mxn4C&usqp=CAU"},
    {name:"Italy", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ4dcrLt4uLIipN4QntqXNemAw7zjUbApSjalpSVCElTASnmHh_&usqp=CAU"},
    {name:"Greece", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTLrISara7MlGRE92xvfsc8ozx1lHQ-ap5x_ZfrPtcfNoEIZkPf&usqp=CAU"},
    {name:"Rome", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQuQKlR6Lf0AvPQ4wBknG2V0YM_NpvyaYF5LwHCrPAD_R5Mxn4C&usqp=CAU"},
    {name:"Italy", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ4dcrLt4uLIipN4QntqXNemAw7zjUbApSjalpSVCElTASnmHh_&usqp=CAU"}
];

app.get("/",function(req,res){
    res.render("landing");
});

app.get("/campgrounds",function(req,res){
    res.render("campgrounds" , {campgrounds:campgrounds});
});

app.post("/campgrounds",function(req,res){
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name : name ,image: image}
    campgrounds.push(newCampground);
    
    //redirect back to campgrounds
    res.redirect("/campgrounds");
});


app.get("/campgrounds/new" , function(req,res){
    res.render("new.ejs");
});

app.listen(3000,function(){
    console.log("Yelpcamp  has started");
});