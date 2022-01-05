let diagnostic = [];

fs = require('fs');

let inputFile = fs.readFileSync('aoc21-d3inp.txt', 'utf8', (err, data) => {
//let inputFile = fs.readFileSync('test.txt', 'utf8', (err, data) => {
    if (err) throw err;});

diagnostic = inputFile.split('\n');
diagnostic.pop();   //remove last empty line
let numInputs = diagnostic.length;
let binSize = 12;
let bitSum = [0,0,0,0,0,0,0,0,0,0,0,0];
let oxy = [0,0,0,0,0,0,0,0,0,0,0,0];
let co2 = [0,0,0,0,0,0,0,0,0,0,0,0];

console.log(diagnostic);

//common bits
oxy = diagnostic.slice();
for(i = 0; i < binSize; i++){
    let comBit = commonBit(oxy, i, 1);
    if(oxy.length > 1)
        oxy = oxy.filter((val) => {
            return Number(val[i]) == comBit;
            //console.log(val[i]);
        });
    console.log(oxy, oxy.length, i);
}
//Least common bits
co2 = diagnostic.slice();
for(i = 0; i < binSize; i++){
    let comBit = commonBit(co2, i, 0);
    if(co2.length > 1){
        co2 = co2.filter((val) => {
            return Number(val[i]) == comBit;
            //console.log(val[i]);
        });
    }
    console.log(co2, co2.length, i);
}

console.log(`O2: ${parseInt(oxy[0],2)} CO2: ${parseInt(co2[0],2)}`)


//common = 0 for uncommon selection
function commonBit(bitArr, bitNum, common = 1){
    let sumBit = 0;
    for(let i = 0; i < bitArr.length; i++){
        sumBit += parseInt(bitArr[i][bitNum]);
//      console.log(bitArr.length, bitArr[i], sumBit);
    }
//  console.log(bitArr, sumBit);
    if(common == 1)
        return (sumBit - bitArr.length/2) >= 0 ? 1 : 0; //common
    else
        return (sumBit - bitArr.length/2) >= 0 ? 0 : 1; //uncommon
}