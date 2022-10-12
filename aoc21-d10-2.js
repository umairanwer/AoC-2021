
fs = require('fs');

let inputFile = fs.readFileSync('aoc21-d10inp.txt', 'utf8', (err, data) => {
    if (err) throw err;
});

let inputData = inputFile.split('\r\n');

console.log(inputData);

let charScores = { ')': 1, ']': 2, '}': 3, '>': 4 }

let openingChars = ['(', '[', '{', '<']
let closingChars = [')', ']', '}', '>']
let charPairs = { '(': ')', '[': ']', '{': '}', '<': '>' }
// count of illegal chars
const illegalRows = [];
const autoCompleteCharsArray = []

for (let row = 0; row < inputData.length; row++) {
    charsArray = []
    let illegalRow = false;
    for (let col = 0; col < inputData[row].length; col++) {
        let currChar = inputData[row][col];
        //console.log(charsArray);

        //IF this char is opening char then add it to array
        if (openingChars.includes(currChar))
            charsArray.push(currChar)
        // ELSE (closing char) then IF it is closing the latest opening char (charsArray's last term)
        // remove the last element of charsArray
        else if (charPairs[charsArray[charsArray.length - 1]] == currChar)
            charsArray.pop();
        // ELSE (it's illegal)
        else {
            illegalRows.push(row)
            illegalRow = true
            break;
        }
    }

    //IF row is not illegal then create autocomplete array
    if(! illegalRow){
        const autoCompleteRow = []
        // shift the array since the last char to be closed will have to be inserted first by autocompletion
        for(char of charsArray){
            autoCompleteRow.unshift(charPairs[char])
        }
        autoCompleteCharsArray.push(autoCompleteRow)
    }
}

const scoreList = [];
for(arr of autoCompleteCharsArray){
    let score = 0;
    for(char of arr){
        score *= 5;
        score += charScores[char]
    }
    scoreList.push(score)
}

// sort in ascending
scoreList.sort((a, b) => a-b);

// return middle score
console.log(scoreList[ (scoreList.length+1)/2 -1 ]);
