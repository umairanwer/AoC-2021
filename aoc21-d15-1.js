fs = require('fs');
const inputFile = fs.readFileSync('aoc21-d15inp.txt', 'utf8', (err, data) => {
    if (err) throw err;
});

const input = inputFile.split('\r\n');

console.log(input);

class Graph {
    constructor() {
        this.adjList = {};
    }

    addVertex(vertex) {
        if (!(vertex in this.adjList))
            this.adjList[vertex] = {};
    }

    addEdge(source, dest, weight) {
        if (!(source in this.adjList)) this.addVertex(source);
        //if (!(dest in this.adjList)) this.addVertex(dest);

        this.adjList[source][dest] = parseInt(weight)
        //        this.adjList[dest].push(source);
    }
}

const maze = new Graph();

for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
        if (j < input[i].length - 1)
            maze.addEdge(`${i},${j}`, `${i},${j + 1}`, input[i][j + 1])
        if (j > 0)
            maze.addEdge(`${i},${j}`, `${i},${j - 1}`, input[i][j - 1])
        if (i < input.length - 1)
            maze.addEdge(`${i},${j}`, `${i + 1},${j}`, input[i + 1][j])
        if (i > 0)
            maze.addEdge(`${i},${j}`, `${i - 1},${j}`, input[i - 1][j])
    }
}
console.log(maze.adjList);

let shortestDistanceNode = (distances, visited) => {

    let shortest = null
    console.time()
    for (let node in distances) {
        // if shortest is NULL or distance of current is less than the previous
        // shortest then this is currently the shortest node
        let currentIsShortest = shortest === null || distances[node] < distances[shortest]

        // if current is the shortest node then update variable
        if (currentIsShortest && !(node in visited))
            shortest = node;
            
    }
    console.log(Object.keys(distances).length);
    console.timeEnd();
    return shortest;
}

let findShortestPath = (graph, startNode, endNode) => {
    // track nodes from start using hash
    let distances = {}
    //distances[endNode] = 1000000000;
    distances = Object.assign(distances, graph.adjList[startNode])

    //console.log(distances);
    //console.log(graph.adjList[startNode]);

    // track paths using hash object
    let parents = { endNode: null }
    for (const child in graph.adjList[startNode]) {
        parents[child] = startNode
    }

    let visited = {startNode: true}

    let node = shortestDistanceNode(distances, visited);

    while (node) {
        let len = Object.keys(visited).length
        if(len %100 == 0)console.log(len);
        // find distance of node from startNode
        let distance = distances[node]
        let children = graph.adjList[node]

        for (const child in children) {
            if (child == startNode) continue;
            else {
                let newDistance = distance + children[child];
                if (!distances[child] || distance[child] > newDistance) {
                    distances[child] = newDistance
                    parents[child] = node
                }
            }
        }
        visited[node] = true
        node = shortestDistanceNode(distances, visited)
        //console.log(visited);
    }

    let shortestPath = [endNode]
    let parent = parents[endNode]
    while (parent) {
        shortestPath.push(parent);
        parent = parents[parent];
    }
    shortestPath.reverse()
    let results = {
        distance: distances[endNode],
        path: shortestPath,
    };
    //console.log(distances);
    return results;
}

console.log(findShortestPath(maze, '0,0', '99,99'))

console.log(input.length, input[0].length);