
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
        if (currPath.includes(vertex) && vertex == vertex.toLowerCase())    return;

        // add vertex to current path
        currPath.push(vertex);
        // for all nodes connected to current vertex
        // apply dfs till "END" is encountered
        // if "END" then save this path and move to next neighbour
        adjList[vertex].forEach(neighbour => {
            if (neighbour != 'start' ) {
                //console.log(vertex, neighbour);
                if (neighbour == 'end') {
                    pathsList.push([...currPath, neighbour])
                    return;
                }
                else{
                    return dfs(neighbour, [...currPath]);
                }
            }
        })
    })('start', []);
    console.log(pathsList, pathsList.length)
}

graph.dfsRecursive('start')