var movies = [
    {
    title: "Finding nemo",
    hasWatched:true,
    rating:5
},
    {
    title:"Frozen",
    hasWatched:false,
    rating:4.5

}
]

movies.forEach(function(movie){
    var  result = "You have";
    if(movie.hasWatched){
        result += "watched";

    }else{
        result+="not seen";
    }
    result += "\"" + movie.title + "\"-";
    result += movie.rating + "stars";
    console.log(result)
});