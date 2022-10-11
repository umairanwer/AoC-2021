const { exit } = require('process');

fs = require('fs');

let inputFile = fs.readFileSync('aoc21-d9inp.txt', 'utf8', (err, data) => {
    if (err) throw err;
});

let inputData = inputFile.split('\r\n');

//obj storing all min values with posns {(val, r, c)}
let listBasins = []
// replace all 9s with space and everything else with 1
for (let row = 0; row < inputData.length; row++) {
    inputData[row] = inputData[row].replace(/[0-8]/g, '1')
    inputData[row] = inputData[row].replace(/[9]/g, ' ')
    console.log(inputData[row]);
}

searchedPosns = [];
function groupSearch(row, col) {
    //console.log(row, col);

    // return if posn already searched
    // since a posn can only be part of 1 group
    if (searchedPosns.indexOf(`[${row}, ${col}]`) >= 0)
        return 0;

    // return if bounds exceeded
    if (row >= inputData.length || row < 0)
        return 0;
    if (col >= inputData[row].length || col < 0)
        return 0;

    // return if not part of a basin i.e largest value (9)
    if (inputData[row][col] != '1')
        return 0;
    
    // add current posn to searched list
    searchedPosns.push(`[${row}, ${col}]`);
    let groupSize = 1;

    // search all neighbours recursively
    groupSize += groupSearch(row + 1, col);
    groupSize += groupSearch(row - 1, col);

    groupSize += groupSearch(row, col + 1);
    groupSize += groupSearch(row, col - 1);

    return groupSize;
}

groupSizesList = []
for (let row = 0; row < inputData.length; row++) {
    for (let col = 0; col < inputData[row].length; col++) {
        let currGroupSize = groupSearch(row, col);
        
        if (currGroupSize > 0) groupSizesList.push(currGroupSize)
    }
}

let biggestThreeGroups = groupSizesList
                                .map(val => parseInt(val))
                                .sort((a, b) => b - a)
                                .slice(0, 3);

// product of all biggest groups
console.log(biggestThreeGroups.reduce( (prev, val) => prev * val));


/*
for (let row = 0; row < inputData.length; row++) {
    let basinSize = 0;
    let basinStartPosn;
    let basinEndPosn;
    let basinStarted = false;

    for (let col = 0; col < inputData[row].length; col++) {
        let currentInput = inputData[row][col];
        //console.log(col, inputData[row][col])
        if (currentInput == '1'){
            // if basin was not already started save start posn
            // and set flag to true
            if (!basinStarted){
                basinStartPosn = col;
                basinStarted = true;
            }
            basinSize++;
        }
        // If basin has reached its end after it started, save end posn
        // and set flag to false, also store current size with posns
        // some conditionals to cater for a sink posn at end
        if (basinStarted && (col == inputData[row].length - 1 || currentInput != '1')){

            if (col == inputData[row].length - 1)
                basinEndPosn = col;
            else if (currentInput != '1')
                basinEndPosn = col - 1;

            basinStarted = false;
            // add a new array for storing basins of each row
            listBasins.push([])
            listBasins[row].push([row, basinStartPosn, basinEndPosn, basinSize])

            basinSize = 0;

        }
    }
}


// search all rows and update basin size by checking prev rows
// now each of the element in row basin will have sum of all the
// sizes of the basins connected in rows above (if connected)
for(let row = 1; row < listBasins.length; row++){
    // get each row basin data
    // check if those basins are connected to prev rows
    for (let rowBasin = 0; rowBasin < listBasins[row].length; rowBasin++){

        let basinStart = listBasins[row][rowBasin][1];
        let basinEnd = listBasins[row][rowBasin][2];
        let basinSize = listBasins[row][rowBasin][3];

        // for each basin search the prev row
        for (let prevRowBasin = 0; prevRowBasin < listBasins[row-1].length; prevRowBasin++) {
            let prevBasinStart = listBasins[row-1][prevRowBasin][1];
            let prevBasinEnd = listBasins[row-1][prevRowBasin][2];
            let prevBasinSize = listBasins[row-1][prevRowBasin][3];

            // if row basin of prev row is within the limits of current row basin
            // then update SIZE of current row basin, and set connected basin in prev row to 0
            // so it doesn't effect final sorting calcs
            if ((basinStart <= prevBasinStart && basinEnd >= prevBasinStart) || (basinStart <= prevBasinEnd && basinEnd >= prevBasinEnd)){
                listBasins[row][rowBasin][3] += prevBasinSize;

                listBasins[row - 1][prevRowBasin][3] = -1;
            }

        }
    }
}
*/

// Now extract largest sizes from listBasins array
//console.log(listBasins.flat(1).filter(rowSubBasin => rowSubBasin[3] > 80));

//console.log(listBasins.flat(1).filter(rowSubBasin => ( rowSubBasin[3] > 0)));

