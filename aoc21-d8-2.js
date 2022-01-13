fs = require('fs');
//let inputFile = fs.readFileSync('test.txt', 'utf8', (err, data) => { 
let inputFile = fs.readFileSync('aoc21-d8inp.txt', 'utf8', (err, data) => {
   if (err) throw err;});

let inputData = inputFile.split('\n');
inputData.pop();

let displayInputs = inputData.map(seq => seq.split("|")[0].trim());
let displayOutputs = inputData.map(seq => seq.split("|")[1].trim());

//                 0:6     1:2   2:5      3:5     4:4      5:5    6:6    7:3    8:7      9:6
let stdDigits = ["abcefg", "cf","acdeg","acdfg","bcdf","abdfg","abdefg","acf","abcdefg","abcdfg"];
let sensorMap = 'abcdefg'.split("");
//stdDigits.map(printNum);

let outputSum = 0;

for(let mapVals of inputData){
   let inputVals = mapVals.split("|")[0].trim().split(" ");

   let outputVals = mapVals.split("|")[1].trim().split(" ");;
   
   let one = inputVals.filter(val => val.length == 2)[0];
   let four = inputVals.filter(val => val.length == 4)[0];
   let seven = inputVals.filter(val => val.length == 3)[0];
   let eight = inputVals.filter(val => val.length == 7)[0];
   let remaining = inputVals.filter(val => val.length > 4)[0];
   
   let aMap, bMap, cMap, dMap, eMap, fMap, gMap;
   //get value of a by 7-1
   aMap = seven.split("").filter(ch => one.search(ch) == -1 ? true : false);
   //possible values of c and f from 1
   cMap = one.split("");
   fMap = one.split("");
   //possible values of b and d from 4-1
   bMap = four.split("").filter(ch => one.search(ch) == -1 ? true : false);
   dMap = bMap.slice();
   //possible values of e and g from 8-4 and aMap
   eMap = eight.split("").filter(ch => four.search(ch) == -1 ? true : false);
   eMap = eMap.filter(ch => ch !== aMap[0]);
   gMap = eMap.slice();


   //check for all possibilities
   let a = aMap[0];
   let charMap = {a:'a',b:'b',c:'c',d:'d',e:'e',f:'f',g:'g'};
   let mappedInputs;
   let found = false;
   for(let c of cMap){
      charMap.a = a;
      charMap.c = c;
      charMap.f = fMap.filter(ch => ch !== c)[0];

      for(let b of bMap){

         charMap.b = b;
         charMap.d = dMap.filter(ch => ch !== b)[0];
         for(let e of eMap){
            charMap.e = e;
            charMap.g = gMap.filter(ch => ch !== e)[0];
            //console.log(charMap);
            
            //replaces all input segment values with new values and sorts
            mappedInputs = getMapping(charMap, inputVals);
            
            //check mapped inputs against standard values
            found = mappedInputs.every(inp => {
               let fnd = stdDigits.includes(inp);
               //if(!fnd) console.log(inp);
               return fnd;
            });
            if(found) break;
         }
         if(found) break;
      }
      if(found) break;
   }

   if(!found){
      console.log("STILL NOT FOUND!!!");
      console.log(charMap, found);
      break;
   }
   mappedOutput = getMapping(charMap, outputVals);

   //converting mapped output data to digits and summing
   outputSum += +mappedOutput.map(val => stdDigits.indexOf(val)).join("");
   
}
console.log(`Final Sum: ${outputSum}`);

//Final Sum: 986163 
//It Works!!!!!!!!!!!!!!!!!!!!!!!!

function getMapping(charMap, inputVals){
   return inputVals.map(segDisp => segDisp.split("").map(char => {
      for(let chKey in charMap)
         if(charMap[chKey] === char)   return chKey;
      }).sort().join(""));
}

function printNum(segInp){
   let seg = [[]];
   seg[0] = [" .... ", " aaaa "];
   seg[1] = [".", "b"];
   seg[2] = ["    .","    c"]
   seg[3] = [" .... ", " dddd "];
   seg[4] = [".", "e"];
   seg[5] = ["    .","    f"]
   seg[6] = [" .... ", " gggg "];
 
   let inpChars = segInp.split("");
   console.log(seg[0][inpChars.includes('a') ? 1 : 0]);
   console.log(seg[1][inpChars.includes('b') ? 1 : 0]+seg[2][inpChars.includes('c') ? 1 : 0]);
   console.log(seg[1][inpChars.includes('b') ? 1 : 0]+seg[2][inpChars.includes('c') ? 1 : 0]);
   console.log(seg[3][inpChars.includes('d') ? 1 : 0]);
   console.log(seg[4][inpChars.includes('e') ? 1 : 0]+seg[5][inpChars.includes('f') ? 1 : 0]);
   console.log(seg[4][inpChars.includes('e') ? 1 : 0]+seg[5][inpChars.includes('f') ? 1 : 0]);
   console.log(seg[6][inpChars.includes('g') ? 1 : 0]);
}