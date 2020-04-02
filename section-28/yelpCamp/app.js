var express = require("express");
var app = express()
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

app.get("/",function(req,res){
    res.render("landing");
});

var campgrounds = [
    {name : "Rebecca",image:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"},
    {name : "Hill",image:"https://s3.amazonaws.com/imagescloud/images/medias/camping/camping-tente.jpg"},
    {name : "Seas",image:"https://invinciblengo.org/photos/event/slider/manali-girls-special-adventure-camp-himachal-pradesh-1xJtgtx-1440x810.jpg"},
    {name : "Ilands",image:"https://pawnacamp.com/wp-content/uploads/2018/01/Pawna-lake-camping-camp-F-new.jpg"},
    {name : "Rebecca",image:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"},
    {name : "Hill",image:"https://s3.amazonaws.com/imagescloud/images/medias/camping/camping-tente.jpg"},
    {name : "Seas",image:"https://invinciblengo.org/photos/event/slider/manali-girls-special-adventure-camp-himachal-pradesh-1xJtgtx-1440x810.jpg"},
    {name : "Ilands",image:"https://pawnacamp.com/wp-content/uploads/2018/01/Pawna-lake-camping-camp-F-new.jpg"}
];

app.get("/campgrounds", function(req,res){
    
    res.render("campgrounds",{campgrounds:campgrounds});
});

app.post("/campgrounds", function(req,res){

    //get data from form and to campground
    var name=req.body.name;
    var image=req.body.image;
    var newCampground = {name:name, image:image};
    campgrounds.push(newCampground);
    //redirect backk to campgrounds page
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req,res){
    res.render("new.ejs");
     
});


app.listen(3000,function(){
    console.log("Yelp camp has started");
});

