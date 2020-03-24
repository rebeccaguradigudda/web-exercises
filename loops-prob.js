//problem1 display bet -10 to 19
console.log("printing numbers between -10 and 19")
var num = -10;
while(num < 20){
    console.log(num);
    num++;
}

//even numbers between 10 and 40
console.log("printing even nos between 10 and 40");
var num = 10;
while( num <= 40){
    if(num%2===0){
        console.log(num);
    }
    num++;
}

//odd numbers btween 300 and 333
console.log("printing odd nos between 300 and 333");
var num = 300;
while( num <= 333){
    if(num%2!==0){
        console.log(num);
    }
    num++;
}

//all numbers divisible by 5 and 3 between 5 and 50
console.log("printing odd nos between 300 all numbers divisible by 5 and 3 between 5 and 50 333");
var num = 5;
while( num < 51){
    if(num%5===0 && num%3===0){
        console.log(num);
    }
    num++;
}