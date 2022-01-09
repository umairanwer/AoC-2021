let diagnostic = [];

fs = require('fs');

//let inputFile = fs.readFileSync('test.txt', 'utf8', (err, data) => { 
let inputFile = fs.readFileSync('aoc21-d6inp.txt', 'utf8', (err, data) => {
   if (err) throw err;});

let fish = inputFile.split(',').map(Number);
let newFishTimer = 8;
let oldFishTimer = 6;

for(let days = 0; days < 80; days++){
    let newFish = [];
    //reduce a day
    fish = fish.map(val => val-1);

    let noOfNewFish = fish.filter(val => val < 0).length;
    newFish = new Array(noOfNewFish).fill(newFishTimer);

    //reset timers < 1
    fish = fish.map(val => val < 0 ? oldFishTimer : val)
    fish = fish.concat(newFish);

    //console.log(`Day:${days}, Fish:${fish}`);
}
console.log("Number of fish:", fish.length);