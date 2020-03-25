//print reverse
console.log("print reverse");

function printReverse(arr){
    for(var i = arr.length-1; i >= 0; i--){

    }
}
printReverse([3,6,5,4]);

//is uniform

console.log("is uniform");

function isUniform(arr){
    var first = arr[0];
    for(var i=1 ; i <= arr.length; i++){
       if(arr[i] !== first){
           return false;
       } 
       return true;  
    }
    
}

//sumArray
console.log("sum array");

function sumArray(arr){
    var total= 0;
    arr.foreach = function(element){
      total += element; 
    });
    return total;
}

//max element
console.log("max")
function max(arr){
    var max = arr[0];
    for (var i=0;i<arr.length;i++){
        if(arr[i]>max){
            max=arr[i];
        }
    }
}