var express    = require("express");
var app        = express();
var bodyParser = require("body-parser");
// var mongoose   = require("mongoose");

// mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true},{useUnifiedTopology: true});

const mongoose = require('mongoose');

mongoose
  .connect('mongodb://127.0.0.1:27017/test', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log('DB connected!'))
  .catch(err => {
    console.log(`DB Connection Error: ${err.message}`);
  });

//SCHEMA SETUP  
var campgroundSchema = new mongoose.Schema({
    name:String,
    image:String,
    description:String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name : "Hill",
//         image:"https://s3.amazonaws.com/imagescloud/images/medias/camping/camping-tente.jpg",
//         description:"This is a huge granite hill"
// }, 
//         function(err,campground){
//         if(err){
//             console.log(err);
//         }else{
//             console.log("NEWLY CREATED CAMPGROUND: ");
//             console.log(campground);
//         }
//     });


// var campgrounds = [
//     {name : "Rebecca",image:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"},
//     {name : "Hill",image:"https://s3.amazonaws.com/imagescloud/images/medias/camping/camping-tente.jpg"},
//     {name : "Seas",image:"https://invinciblengo.org/photos/event/slider/manali-girls-special-adventure-camp-himachal-pradesh-1xJtgtx-1440x810.jpg"},
//     {name : "Ilands",image:"https://pawnacamp.com/wp-content/uploads/2018/01/Pawna-lake-camping-camp-F-new.jpg"},
//     {name : "Rebecca",image:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"},
//     {name : "Hill",image:"https://s3.amazonaws.com/imagescloud/images/medias/camping/camping-tente.jpg"},
//     {name : "Seas",image:"https://invinciblengo.org/photos/event/slider/manali-girls-special-adventure-camp-himachal-pradesh-1xJtgtx-1440x810.jpg"},
//     {name : "Ilands",image:"https://pawnacamp.com/wp-content/uploads/2018/01/Pawna-lake-camping-camp-F-new.jpg"}
// ];


app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

//HOME PAGE
app.get("/",function(req,res){
    res.render("landing");
});

//INDEX - SHOW ALL CAMPGROUNDS
app.get("/campgrounds", function(req,res){
    // Get all campgrounds from db
    Campground.find({},function(err,allcampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("index",{campgrounds:allcampgrounds});
        }
    });
    
});

//CTEATE- ADD A NEW CAMPGROUND TO DB
app.post("/campgrounds", function(req,res){

    //get data from form and to campground
    var name=req.body.name;
    var image=req.body.image;
    var desc = req.body.description;
    var newCampground = {name:name, image:image, description : desc};
    //Create a new campgrouund and save to db
    Campground.create(newCampground,function(err,newlyCreated){
        if(err){
            console.log(err);
        }else{
            //redirect backk to campgrounds page
            res.redirect("/campgrounds");
        }
    });
    
});

//SHOW FORM TO CREATE CAMPGROUND
app.get("/campgrounds/new", function(req,res){
    res.render("new.ejs");
     
});

//SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req,res){


    //find the campground with provided id
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            //render show page with all the item
            res.render("show", {campground: foundCampground});
        }
    });
});


app.listen(3000,function(){
    console.log("Yelp camp has started");
});

