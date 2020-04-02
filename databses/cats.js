var mongoose = require("mongoose");
mongoose.connect("mongodb://locathost/cat_app");

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String


});
//adding a new cat to db


//retrieve