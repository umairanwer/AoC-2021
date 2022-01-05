let depth = 0;
let horPosn = 0;

fs = require('fs');

let inputFile = fs.readFileSync('aoc21-d2inp.txt', 'utf8', (err, data) => {
    if (err) throw err;});

course = inputFile.split('\n');

let i=0;
for(let instr of course){
    let [dir, dist] = instr.split(" ");
    dist = Number(dist);
    switch(dir){
        case 'forward':
            horPosn += dist;
            break;
        case 'up':
            depth -= dist;
            break;
        case 'down':
            depth += dist;
            break;
    }
    console.log(dir, dist, horPosn, depth);
    //if(i++ > 10)    break;
}

let aocRes = horPosn*depth;