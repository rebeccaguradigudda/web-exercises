var colors = [
            "rgb(255,0,0)",
              "rgb(255,255,0)",
              "rgb(0,0,255)",
              "rgb(0,255,255)",
              "rgb(0,0,255)",
              "rgb(255,0,255)"
            ]
var colors =  generateRandomColors(6);           
var squares = document.querySelectorAll(".squares");
var pickedcolor = pickedcolor();
var colordisplay = document.getElementById("colordisplay");
var messagedisplay = document.querySelector("span");
colordisplay.textContent = pickedcolor;

for (var i=0;i<squares.length;i++){
    squares[i].style.background = colors[i];
    //add quick listeners
    squares[i].addEventListener("click",function(){
      var clickedcolor = this.style.background;
      if(clickedcolor === pickedcolor){
          messagedisplay.textContent="Correct";
          changecolors(clickedcoolor);
      } else{
          this.style.background = #232323;
          messagedisplay.textContent="Try Again"
      } 
    });
}
function changecolors(color){
    for (var i=0;i<squares.length;i++){
        squares[i].style.background = color;
    }
}

function pickedcolor(){
    var random = Math.floor(Math.random)* colors.length};
    return colors[random];

}

function generateRandomColors(num){
    
}

