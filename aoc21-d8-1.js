fs = require('fs');
//let inputFile = fs.readFileSync('test.txt', 'utf8', (err, data) => { 
let inputFile = fs.readFileSync('aoc21-d8inp.txt', 'utf8', (err, data) => {
   if (err) throw err;});

let inputData = inputFile.split('\n');
inputData.pop();

let displayInputs = inputData.map(seq => seq.split("|")[1].trim());

displayInputs = displayInputs.join(" ").split(" ").filter(input => {
   let len = input.length;
   switch(true){
      case(len <= 4):
      case(len == 7):
         return true;
   }
   return false
});
console.log(displayInputs.length); //421 is answer
