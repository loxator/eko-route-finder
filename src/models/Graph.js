export default class Graph {
  constructor() {
    this.numberOfNodes = 0;
    this.adjacentList = {};
  }
  addVertex(node) {
    this.adjacentList[node] = [];
    this.numberOfNodes++;
  }
  addEdge(node1, node2) {
    //directed graph
    this.adjacentList[node1].push(node2);
  }

  getPossibleRoutesBFS = (start, end) => {
    //Intialize result array
    let result = [];

    //Initialize Queue
    let queue = [[start.to]];
    try {
      //Error Checking
      if (!this.adjacentList[start.to]) {
        throw Error("The start route does not exist");
      }
      if (!this.adjacentList[end]) {
        throw Error("The end route does not exist");
      }
      while (queue.length) {
        //Get first element from queue
        let paths = queue.shift();

        //Get the last node of the current path in Queue
        let lastNode = paths[paths.length - 1];

        //If lastNode matches end, we have reached our destination
        //So, push to result array
        if (lastNode === end) {
          result.push([paths]);
        } else {
          //Else, get adjacent routes from current Node
          //Add those routes to the queue to be checked later
          let neighbors = this.adjacentList[lastNode];

          if (neighbors) {
            for (let neighbor of neighbors) {
              let list = [...paths, ...neighbor.to];
              queue.push(list);
            }
          }
        }
      }
    } catch (error) {
      return { error: true, text: error };
    }

    return result;
  };
}
