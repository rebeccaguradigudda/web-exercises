function average(){
    var total = 0;
    scores.forEach(function(score){
        total += score;
    });
    var avg = total/scores.length;
    return Math.round(avg);
}

var scores = [90,30,20];
console.log (average(scores));

var scores2 = [40,20,90,60,85];
console.log(average(scores2));
