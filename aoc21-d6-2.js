const { cursorTo } = require('readline');

let diagnostic = [];

fs = require('fs');

//let inputFile = fs.readFileSync('test.txt', 'utf8', (err, data) => { 
let inputFile = fs.readFileSync('aoc21-d6inp.txt', 'utf8', (err, data) => {
   if (err) throw err;});

let fish = inputFile.split(',').map(Number);
let newFishTimer = 8;
let oldFishTimer = 6;

//set initial state
fishTimers = Array(newFishTimer+1).fill(0);
for(let i = 0; i < fish.length; i++){
    fishTimers[fish[i]]++;
}

console.log(fishTimers)
for(let days = 0; days < 256; days++){
    fishTimers.push(fishTimers.shift());
    fishTimers[oldFishTimer] += fishTimers[newFishTimer];
    console.log(`Day: ${days}`)
}
console.log("Number of fish:", fishTimers.reduce((acc, cur) => acc += cur, 0));


function printFish(fishTimers){
    let print = '';
    for(let [ind, num] of fishTimers.entries())
        for(let i=0; i < num; i++){
            print += ind;
        }
    console.log(print);
}