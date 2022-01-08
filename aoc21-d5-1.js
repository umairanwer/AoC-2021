let diagnostic = [];

fs = require('fs');

//let inputFile = fs.readFileSync('test.txt', 'utf8', (err, data) => { 
let inputFile = fs.readFileSync('aoc21-d5inp.txt', 'utf8', (err, data) => {
   if (err) throw err;});

let fileInput = inputFile.split('\n');
fileInput.pop();    //remove empty end line
let gridSz = 1000;

let grid = Array(gridSz).fill().map(() => Array(gridSz).fill(0)); //outer dimension for y-axis, inner for x-axis
console.log(`Total Entries: ${fileInput.length}`)

for(let [index, line] of fileInput.entries()){    //entries function returns an iterator for an array
    //if(index == 1) break;
    let linePts = line.split(" -> ");
    let [x1, y1, x2, y2] = [...linePts[0].split(','), ...linePts[1].split(',')].map(Number);
    
    //console.log(line, [x1, y1, x2, y2])

    //x1 and y1 to always be less than x2 and y2 for ease of calcs
    if(x2 < x1) [x1, x2] = [x2, x1];    //ONLY for hor lines
    if(y2 < y1) [y1, y2] = [y2, y1];    //ONLY for hor lines

    if(x1 !== x2 && y1 !== y2){  //neglecting non horizontal lines
        //console.log('Non-hor: ' + [x1,y1,x2,y2]);
        continue; 
    }
    let yL = 0;
    if((x1-x2) > 0 || (y1-y2) >0)   console.log('prob:' +[x1,y1,x2,y2]);

    for(let yAx = y1; yAx <= y2; yAx++){
        let xL = 0;
        yL++;
        
        for(let xAx = x1; xAx <= x2; xAx++){
            xL++;
            grid[yAx][xAx]++; 
        }
    }

}

//output no of values >= 2
console.log(grid.map((axis) => axis.filter((val)=>val>=2))
                .map((axis)=> axis.length)
                .reduce((acc, val)=>acc+val, 0));
//printGrid(grid);

function printGrid(grid){
    let complete = '';
    for(let y=0; y<grid.length; y++){
        let horMap = '.'.repeat(grid[y].length).split("");
        for(let x=0; x<grid[y].length; x++){
            if(grid[y][x] > 0)  horMap[x] = grid[y][x];
        }
        console.log(horMap.join(""));
    }
}