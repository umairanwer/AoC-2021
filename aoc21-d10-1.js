
fs = require('fs');

let inputFile = fs.readFileSync('aoc21-d10inp.txt', 'utf8', (err, data) => {
    if (err) throw err;
});

let inputData = inputFile.split('\r\n');

console.log(inputData);

let charScores = { ')': 3, ']': 57, '}': 1197, '>': 25137 }

let openingChars = ['(', '[', '{', '<']
let closingChars = [ ')', ']', '}', '>']
let charPairs = { '(':')', '[':']', '{':'}', '<':'>' }
// count of illegal chars
let illegalCharCount = { ')': 0, ']': 0, '}': 0, '>': 0 }

for (let row = 0; row < inputData.length; row++) {
    charsArray = []
    for (let col = 0; col < inputData[row].length; col++) {
        let currChar = inputData[row][col];
        //console.log(charsArray);

        //IF this char is opening char then add it to array
        if(openingChars.includes(currChar))
            charsArray.push(currChar)
        // ELSE (closing char) then IF it is closing the latest opening char (charsArray's last term)
        // remove the last element of charsArray
        else if(charPairs[ charsArray[charsArray.length-1] ] == currChar)
            charsArray.pop();
        // ELSE (it's illegal)
        else {
            illegalCharCount[currChar]++;
            console.log("Illegal at", row, col)
            break;
        }
    }    
}

let score = 0
for (const char in illegalCharCount) {
    score += illegalCharCount[char]*charScores[char]
}
console.log(illegalCharCount,"\nScore:",score);

/*
function rowChecker(rowNum, index, openingChars){
    //if out of bounds return true
    if (index >= inputData[rowNum].length)
        return true;
    
    let currChar = inputData[rowNum][index];
    let nextChar = inputData[rowNum][index+1];
    
    let boolIllegalNotFound = true;

    console.log(currChar, nextChar);

    // if next char is an opening char search recursively
    if(openingChars.includes(nextChar))
        boolIllegalNotFound = rowChecker(rowNum, index + 1, openingChar);

    // stop search if illegal char found
    if(!boolIllegalNotFound)    return false

    // if next char is closing char and correct pair is closing skip next char
    // else update illegal char count
    if (closingChars.includes(nextChar) && charPairs[currChar] == nextChar) 
        boolIllegalNotFound = rowChecker(rowNum, index + 2);
    else if (closingChars.includes(nextChar)){
        illegalCharCount[nextChar]++
        boolIllegalNotFound = false;
    }
    // stop search if illegal char found
    if (!boolIllegalNotFound) return false
}

console.log(illegalCharCount);*/


/*
for (let row = 2; row < 3; row++) {
    // opening char will add one and closing char will subtract one
    // as soon as count becomes negative the character would be illegal
    let charCount = { '(': 0, '[': 0, '{': 0, '<': 0 }

    for (let col = 0; col < inputData[row].length; col++) {
        let char = inputData[row][col];

        // if current char is part of charCount dict (opening char), then increment
        // else it would be closing char so move to switch statements
        if (char in charCount) {
            charCount[char]++;
        }
        else switch (char) {
            case ')':
                charCount['(']--
                break;
            case ']':
                charCount['[']--
                break;
            case '}':
                charCount['{']--
                break;
            case '>':
                charCount['<']--
                break;
            default:
                console.error('Switch Case Error!!!');
                break;
        }

        console.log(charCount);
        let illegalCharOnRow = false;
        // checks if any of char count is negative every time
        for (const checkChar in charCount) {
            if (charCount[checkChar] < 0) {
                switch (checkChar) {
                    case '(':
                        illegalCharCount[')']++
                        illegalCharOnRow = true;
                        break;
                    case '[':
                        illegalCharCount[']']++
                        illegalCharOnRow = true;
                        break;
                    case '{':
                        illegalCharCount['}']++
                        illegalCharOnRow = true;
                        break;
                    case '<':
                        illegalCharCount['>']++
                        illegalCharOnRow = true;
                        break;
                    default:
                        console.error('Switch Case Error!!!');
                        break;
                }
                // break search for illegal char if found one
                break;
            }}

            // If illegal char encountered then break search on row
        if(illegalCharOnRow)    break;
    }

}
*/
