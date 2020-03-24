//write isEven() function

// function isEven(num){
//     if(num%2===0){
//         return true;
//     }else{
//         return false;
//     }
// }

function isEven(num){
    return num%2 ===0;

}

//Factorial
function factorial(num){
    var result = 1;
    for (var i=2;i<=num;i++){
        result=result*i;
    }
    return result;
}

//kebab to string

function kebabToSnake(str){
    var newstr=str.replace(/-/g,"_")
    return newstr;
}