let diagnostic = [];

fs = require('fs');

let inputFile = fs.readFileSync('aoc21-d4inp.txt', 'utf8', (err, data) => {
    if (err) throw err;});

fileInput = inputFile.split('\n');

let bingoInput = fileInput.shift();
fileInput.shift();

let bingoTables = fileInput.map(val => val.replace(/\s\s/, " ").split(" ").filter((val) => val !== ''))
bingoTables = bingoTables.map((element) => element.map(Number));
bingoTables = bingoTables.filter(val => val.length > 1);

let bingoMark = [];

for(let i=0; i< bingoTables.length; i++)
    bingoMark.push([0, 0, 0, 0, 0]);

bingoInput = bingoInput.split(",").map(Number);
//console.log(bingoInput);

//Mark inputs
let tablesWon = 0;
let wonTables = []; //sequence of table row numbers%5 which won

for(let num of bingoInput){
    for(let i=0; i<bingoTables.length; i++)
        for(let j=0; j<bingoTables[0].length; j++){
            if(bingoTables[i][j] == num)
                bingoMark[i][j] = 1;
        }
    //console.log(bingoMark);
    let bingoRow = checkBingo(num);
    if(bingoRow)    console.log(`Last Bingo at Row: ${bingoRow}, on called number ${num}, table`);
    if(bingoRow){

        let tableStart = bingoRow - bingoRow%5;
        let winTable = bingoTables.slice(tableStart, tableStart+5);
        let winMarks = bingoMark.slice(tableStart, tableStart+5);
        let unMarks = winMarks.map(val => val.map(v => v-1)).map(val => val.map(v => v*(-1)));   //invert mark values to check unmarked nums
        let sumUnMark = 0;
        for(let i=0; i<unMarks.length; i++)
            for(let j=0; j<unMarks[i].length; j++)
                sumUnMark += winTable[i][j]*unMarks[i][j];
        console.log(`Sum of unmarked numbers is ${sumUnMark}`);

    }
}

function checkBingo(num){
    let rowSum = 0;
    let colSum = [0, 0, 0, 0, 0];
    for(let i=0; i<bingoTables.length; i++){
        rowSum = 0;
        if(i % 5 == 0){   //new table
            colSum = [0, 0, 0, 0, 0];
        }
        for(let j=0; j<bingoTables[0].length; j++){
            rowSum += bingoMark[i][j];
            colSum[j] += bingoMark[i][j];
        }
        if(rowSum == 5 || colSum.indexOf(5) >= 0){
            if(wonTables.indexOf(i-i%5) == -1){
                wonTables.push(i-i%5);
               // console.log(wonTables, num);  //sequence of winnings
                if(i-i%5 == 470){    //last to win is 470 as per previous iteration for given input
                    return i-i%5;
                }
            }

            //console.log("BINGOOOOOO!!!!!!!", i, i-i%5);
            //return i;
        }
    }
    return false
}