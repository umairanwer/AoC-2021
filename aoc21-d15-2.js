
fs = require('fs');
const inputFile = fs.readFileSync('aoc21-d15inp.txt', 'utf8', (err, data) => {
    if (err) throw err;
});

const input = inputFile.split('\r\n');

//console.log(input);

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


let nTiles = 5
let tileInput = Array(input.length * nTiles).fill(0).map(elm => new Array(input[0].length * nTiles).fill(-1));
//console.log(tileInput);
let iLimit = input.length;
let jLimit = input[0].length;
for (let i = 0; i < iLimit * nTiles; i++) {
    for (let j = 0; j < jLimit * nTiles; j++) {
        let iInd = i % input.length;
        let jInd = j % input[0].length;
        let iTile = Math.floor(i / input.length)
        let jTile = Math.floor(j / input[0].length)

        let newVal = parseInt(input[iInd][jInd]) + iTile + jTile;
        while (newVal > 9) newVal -= 9;

        tileInput[i][j] = newVal
        //console.log(i, j, iInd, jInd, iTile, jTile, newVal, tileInput[i][j]);
        //console.log(tileInput[i][j])
    }

}


for (let i = 0; i < tileInput.length; i++) {
    for (let j = 0; j < tileInput[0].length; j++) {

        if (j < tileInput[0].length - 1)
            maze.addEdge(`${i},${j}`, `${i},${j + 1}`, tileInput[i][j + 1])
        if (j > 0)
            maze.addEdge(`${i},${j}`, `${i},${j - 1}`, tileInput[i][j - 1])
        if (i < tileInput.length - 1)
            maze.addEdge(`${i},${j}`, `${i + 1},${j}`, tileInput[i + 1][j])
        if (i > 0)
            maze.addEdge(`${i},${j}`, `${i - 1},${j}`, tileInput[i - 1][j])
    }
}

//console.log(maze.adjList);

class qElement {
    constructor(element, priority) {
        this.element = element
        this.priority = priority
    }
}
class PriorityQueue {
    constructor() {
        this.items = []
    }

    enque(element, priority) {
        let qElm = new qElement(element, priority)
        let contain = false

        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].priority < qElm.priority) {
                this.items.splice(i, 0, qElm);
                contain = true
                break;
            }
        }
        if (!contain) {
            this.items.push(qElm)
        }
    }

    deque() {
        if (this.items.length == 0) {
            console.error("Underflow")
        }
        return this.items.pop();
    }
    front() {
        if (this.items.length == 0)
            return null;
        return this.items[this.items.length - 1];
    }
    rear() {
        if (this.isEmpty())
            return "No elements in Queue";
        return this.items[0];
    }
    get(element) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].element == element) return this.items[i].priority;
        }
        return null
    }
    remove(element) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].element == element) {
                return this.items.splice(i, 1);
            }
        }
        return null
    }
    printPQueue() {
        let str = '';
        for (let i = this.items.length - 1; i >= 0; i--) {
            str += this.items[i].element + ":" + this.items[i].priority + " "
        }
        return str;
    }
    size() {
        return this.items.length
    }
}


let findShortestPath = (graph, startNode, endNode) => {
    // track nodes from start using hash
    let distances = new PriorityQueue();
    let distList = {}
    for (const key in graph.adjList) {
        distList[key] = Infinity;
        //distances.enque(key, 10000000000)
    }
    distList[startNode] = 0;
    //distList = Object.assign(distList, graph.adjList[startNode])
    //console.log(distList);
    /*for (const key in graph.adjList[startNode]) {
        distances.enque(key, graph.adjList[startNode][key])
    }*/
    //distances.remove(startNode)
    distances.enque(startNode, 0)

    let parents = { endNode: null }
    for (const child in graph.adjList[startNode]) {
        parents[child] = startNode
    }

    let visited = { startNode: true }

    while (distances.front() !== null) {
        //console.log(distances.size());
        //console.log(distances.printPQueue());
        let len = Object.keys(visited).length
        //if (len % 100 == 0) console.log(len);

        let shortestStep = distances.deque();
        let currentNode = shortestStep.element;
        if (currentNode == endNode) break;

        Object.keys(graph.adjList[currentNode]).forEach(neighbour => {
            let dist = distList[currentNode] + graph.adjList[currentNode][neighbour];
            //console.log(currentNode, neighbour, dist, distList[neighbour], graph.adjList[currentNode]);

            if (dist < distList[neighbour]) {
                distList[neighbour] = dist
                parents[neighbour] = currentNode
                //distances.remove(neighbour);
                distances.enque(neighbour, dist);
                //visited[neighbour] = true;
            }
        })
    }

    let shortestPath = [endNode]
    let parent = parents[endNode]
    while (parent) {
        shortestPath.push(parent);
        parent = parents[parent];
    }
    shortestPath.reverse()
    let results = {
        distance: distList[endNode],
        path: shortestPath,
    };
    return results;
}
let yEnd = tileInput.length-1;
let xEnd = tileInput[0].length-1
console.log(findShortestPath(maze, '0,0', `${xEnd},${yEnd}`))

console.log(input.length, input[0].length)