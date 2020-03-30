var faker = require("faker");



// var randomName = faker.name.findName(); // Rowan Nikolaus
// var randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
// var randomCard = faker.helpers.createCard(); // random contact card containing many properties

// console.log(randomName);
// console.log(randomEmail);
// console.log(randomCard);
console.log("==============================");
console.log("welcome to my shop");
console.log("==============================")
for(var i=0;i<10;i++){
    console.log(faker.commerce.productName()+"-"+"$"+faker.commerce.price());

}

