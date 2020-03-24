//create secret number
var secretnumber = 4;

//ask user for guess
var guess = prompt("guess a number");

//check if guess is right
if (Number(guess)===secretnumber){
    alert("You got it right");

}

else if (Number(guess)>secretnumber){
    alert("too high");
}
else {
    alert("too low");
}