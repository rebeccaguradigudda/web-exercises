var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var Campground = require("./models/campground");
var seeDB = require("./seeds");

const mongoose = require('mongoose');

seeDB();
mongoose
  .connect('mongodb://127.0.0.1:27017/yelp_camp', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log('DB connected!'))
  .catch(err => {
    console.log(`DB Connection Error: ${err.message}`);
  });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");  

// SCHEMA SETUP  
// var campgroundSchema = new mongoose.Schema({
//     name:String,
//     image:String,
//     description:String
// });

// var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name:"Rome",
//         image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQuQKlR6Lf0AvPQ4wBknG2V0YM_NpvyaYF5LwHCrPAD_R5Mxn4C&usqp=CAU",
//         description:"No water"
//     },function(err,campground){
//         if(err){
//             console.log("error");
//         }else{
//             console.log("Newly created campground");
//             console.log(campground);
//         }
// });


// var campgrounds = [
//     {name:"Greece", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTLrISara7MlGRE92xvfsc8ozx1lHQ-ap5x_ZfrPtcfNoEIZkPf&usqp=CAU"},
//     {name:"Rome", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQuQKlR6Lf0AvPQ4wBknG2V0YM_NpvyaYF5LwHCrPAD_R5Mxn4C&usqp=CAU"},
//     {name:"Italy", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ4dcrLt4uLIipN4QntqXNemAw7zjUbApSjalpSVCElTASnmHh_&usqp=CAU"},
//     {name:"Greece", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTLrISara7MlGRE92xvfsc8ozx1lHQ-ap5x_ZfrPtcfNoEIZkPf&usqp=CAU"},
//     {name:"Rome", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQuQKlR6Lf0AvPQ4wBknG2V0YM_NpvyaYF5LwHCrPAD_R5Mxn4C&usqp=CAU"},
//     {name:"Italy", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ4dcrLt4uLIipN4QntqXNemAw7zjUbApSjalpSVCElTASnmHh_&usqp=CAU"}
// ];

app.get("/",function(req,res){
    res.render("landing");
});


//INDEX--show all campgrounds
app.get("/campgrounds",function(req,res){
    //Get all campgrounds from db
    Campground.find({}, function(err,allcampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("index" , {campgrounds:allcampgrounds});
        }
    });
    
});

//CREATE -- add new campground
app.post("/campgrounds",function(req,res){
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name : name ,image: image, description:desc}
    //Create a new campground and save to db
    Campground.create(newCampground, function(err,newlyCreated){
        if(err){
            console.log(err)
        }else{
            //redirect back to campgrounds
            res.redirect("/campgrounds");
        }
    })
    
});

//NEW -- show form to create campground
app.get("/campgrounds/new" , function(req,res){
    res.render("new.ejs");
});

//SHOW--show us info abt one campground
app.get("/campgrounds/:id", function(req,res){
    //find the campground with provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            console.log(foundCampground);
            //render  show template with that campground
            res.render("show",{campground:foundCampground});

        }
    });

    
});

app.listen(3000,function(){
    console.log("Yelpcamp  has started");
});