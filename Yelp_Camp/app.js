var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user");
var seeDB = require("./seeds");

const mongoose = require('mongoose');


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
app.use(express.static(__dirname + "/public"));
seeDB();

//PASSPORT CONFIG
app.use(require("express-session")({
    secret : "Once again I win",
    resave : false,
    saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser =req.user;
    next();
});
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
            res.render("campgrounds/index" , {campgrounds:allcampgrounds, currentUser : req.user});
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
    });
    
});

//NEW -- show form to create campground
app.get("/campgrounds/new" , function(req,res){
    res.render("campgrounds/new");
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
            res.render("campgrounds/show",{campground:foundCampground});

        }
    });

    
});

//===============================
//Comments routes
//===============================

app.get("/campgrounds/:id/comments/new",isLoggedIn, function(req,res){
    //find campground by id
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new",{campground: campground});
        }
    })
});

// app.post("/campgrounds/:id/comments", function(req,res){
//     //lookup campground using id
//     Campground.findById(req.params.id, function(err,campground){
//         if(err){
//             console.log(err);
//             redirect("/campgrouunds");
//         }else{
//             Comment.create(req.body.comment, function(err, comment){
//                 if(err){
//                     console.log(err);
//                 }else{
//                     campground.comments.push(comment);
//                     campground.save();
//                     res.redirect("/campgrounds/" + campground._id);
//                 }
//             });
         
//     });
    
// });

app.post("/campgrounds/:id/comments",isLoggedIn, function(req,res){
    Campground.findById(req.params.id, function(err,campground){
        if(err){
            console.log(err);
            redirect("/campgrounds");
        }else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

//  ===========
// AUTH ROUTES
//  ===========

// show register form
app.get("/register", function(req, res){
    res.render("register"); 
 });
 //handle sign up logic
 app.post("/register", function(req, res){
     var newUser = new User({username: req.body.username});
     User.register(newUser, req.body.password, function(err, user){
         if(err){
             console.log(err);
             return res.render("register");
         }
         passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds"); 
         });
     });
 });
 
 // show login form
 app.get("/login", function(req, res){
    res.render("login"); 
 });
 // handling login logic
 app.post("/login", passport.authenticate("local", 
     {
         successRedirect: "/campgrounds",
         failureRedirect: "/login"
     }), function(req, res){
 });
 
 // logic route
 app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/campgrounds");
 });
 
 function isLoggedIn(req, res, next){
     if(req.isAuthenticated()){
         return next();
     }
     res.redirect("/login");
 }
 

app.listen(3000,function(){
    console.log("Yelpcamp  has started");
});



