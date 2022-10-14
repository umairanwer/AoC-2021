
fs = require('fs');

let inputFile = fs.readFileSync('aoc21-d12inp.txt', 'utf8', (err, data) => {
    if (err) throw err;
});

let inputData = inputFile.split('\r\n');

class Graph {
    constructor() {
        this.adjList = {};
    }

    addVertex(vertex) {
        if (!(vertex in this.adjList))
            this.adjList[vertex] = [];
    }

    addEdge(source, dest) {
        if (!(source in this.adjList)) this.addVertex(source);
        if (!(dest in this.adjList)) this.addVertex(dest);

        this.adjList[source].push(dest);
        this.adjList[dest].push(source);
    }
}

let graph = new Graph();

console.log(inputData);

inputData.forEach(edge => {
    graph.addEdge(...edge.split("-"))
});

console.log(graph.adjList);

Graph.prototype.dfsRecursive = function (start) {
    const adjList = this.adjList;
    const pathsList = [];

    // dfs recursive algo
    // a bit of modifcation so it traverses all paths
    (function dfs(vertex, currPath) {
        if (!vertex) console.err("null vertex")

        // IF the current vertex is smallcase and it is there on the path chain then RETURN
        // while keeping a provsion of 1 duplicate lowercase node
        // this is checked by converting to a Set and comparing sizes
        // if the difference is less than 1 then condition holds
        if (currPath.includes(vertex) && vertex == vertex.toLowerCase()) {
            if (duplicateCount(currPath) > 0) return;
        }

        // add vertex to current path
        currPath.push(vertex);
        //console.log(currPath)
        // for all nodes connected to current vertex
        // apply dfs till "END" is encountered
        // if "END" then save this path and move to next neighbour
        adjList[vertex].forEach(neighbour => {
            if (neighbour != 'start') {
                //console.log(vertex, neighbour);
                if (neighbour == 'end') {
                    pathsList.push([...currPath, neighbour])
                    return;
                }
                else {
                    return dfs(neighbour, [...currPath]);
                }

            }
        })

        //console.log(pathsList, pathsList.length)
    })('start', []);

    console.log(pathsList, pathsList.length)
}

function duplicateCount(currPath) {
    let count = 0;
    lowerCurrPath = currPath.filter(elm => elm == elm.toLowerCase() && elm != 'start');
    lowerCurrPath.sort();
    for (let i = 0; i < lowerCurrPath.length - 1; i++) {
        if (lowerCurrPath[i] == lowerCurrPath[i + 1]) {
            count++;
        }
    }
//    console.log(currPath, lowerCurrPath, count);
    return count;
}

graph.dfsRecursive('start')