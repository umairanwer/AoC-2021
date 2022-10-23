
fs = require('fs');
const inputFile = fs.readFileSync('aoc21-d13inp.txt', 'utf8', (err, data) => {
    if (err) throw err;
});

const input = inputFile.split('\r\n');

const inpCoords = []
const foldsArr = []

let folds = false
let maxX = 0;
let maxY = 0;
for (const item of input) {
    if (item == '') folds = true;
    if (!folds) {
        let coord = item.split(',').map(chInt => parseInt(chInt));
        if (coord[0] > maxX) maxX = coord[0];
        if (coord[1] > maxY) maxY = coord[1];

        inpCoords.push(coord)
    }
    else if (item != '')
        foldsArr.push(item.replace(/.+?(?=x|y)/, '').split('='))
}

console.log(inpCoords.length);

console.log(foldsArr);

// calc grid size such that first x and y folds are exactl in center
let foldX1 = foldsArr[0][0] == 'x' ? foldsArr[0][1] : foldsArr[1][1];
let foldY1 = foldsArr[0][0] == 'y' ? foldsArr[0][1] : foldsArr[1][1];

console.log(foldX1 * 2 + 1, foldY1 * 2 + 1);

const paperGrid = new Array(foldY1 * 2 + 1).fill(null).map(arr => arr = new Array(foldX1 * 2 + 1).fill(false));
console.log(paperGrid[0].length, paperGrid.length, `MaxX: ${maxX}, MaxY: ${maxY}`)


// all dots are TRUE
for (const coord of inpCoords)
    paperGrid[coord[1]][coord[0]] = true;

let nPaperGrid = paperGrid
for (let f = 0; f < foldsArr.length; f++) {
    nPaperGrid = foldPaper(nPaperGrid, foldsArr[f][1], foldsArr[f][0]);
}

printGrid(nPaperGrid)


// output number of true values in current fold
console.log(nPaperGrid.flat(1).filter(item => item).length)

let sum = 0
for (let y = 0; y < nPaperGrid.length; y++) {
    for (let x = 0; x < nPaperGrid[y].length; x++) {
        sum += nPaperGrid[y][x] ? 1 : 0
    }

}
console.log(sum);

function printGrid(paper) {
    console.log();
    for (let y = 0; y < paper.length; y++) {
        let line = ''
        for (let x = 0; x < paper[y].length; x++) {
            line = line.concat(paper[y][x] ? '#' : '.')
        }
        console.log(line);
    }
}

function foldPaper(paper, alongLine, XorY) {
    console.log(`Folding along ${XorY}, ${alongLine}`);
    let foldedPaper = []
    if (XorY == 'y') {
        for (let y = 0; y < alongLine; y++) {
            let newX = []
            for (let x = 0; x < paper[y].length; x++) {
                //console.log(y, paper.length - 1 - y);
                newX.push(paper[y][x] || paper[paper.length - 1 - y][x])
            }
            foldedPaper.push(newX)
        }
    }
    else if (XorY == 'x') {
        for (let y = 0; y < paper.length; y++) {
            let newX = []
            for (let x = 0; x < alongLine; x++) {
                console.log(x, paper[y].length - 1 - x);
                newX.push(paper[y][x] || paper[y][paper[y].length - 1 - x])
            }
            foldedPaper.push(newX)
        }
    }
    else console.err("WRONG FOLDS")
    return foldedPaper;
}