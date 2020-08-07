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
  showConnections() {
    const allNodes = Object.keys(this.adjacentList);
    for (let node of allNodes) {
      let nodeConnections = this.adjacentList[node];
      let connections = "";
      let vertex;
      for (vertex of nodeConnections) {
        connections += vertex + " ";
      }
      console.log(node + "-->" + connections);
    }
  }

  // getPossibleRoutesBFS = (start, end) => {
  //   const queue = [start];
  //   const visited = new Set();
  //   let routes = [];
  //   let count = 0;
  //   while (queue.length > 0) {
  //     const fromTown = queue.shift()["to"];
  //     //routes.push(fromTown);
  //     const destinations = this.adjacentList[fromTown];

  //     if (destinations) {
  //       for (const town of destinations) {
  //         if (town.to === end) {
  //           console.log(routes);
  //           //routes = [];
  //           count++;
  //         }

  //         if (!visited.has(town.to)) {
  //           visited.add(town.to);
  //           queue.push(town);
  //         }
  //       }
  //     }
  //   }
  //   console.log(count);
  // };
  getPossibleRoutesBFS = (start, end) => {
    let result = [];
    let queue = [[start.to]];
    try {
      if (!this.adjacentList[start.to]) {
        throw Error("The start route does not exist");
      }
      if (!this.adjacentList[end]) {
        throw Error("The end route does not exist");
      }
      while (queue.length) {
        let paths = queue.shift();
        let lastNode = paths[paths.length - 1];
        if (lastNode === end) {
          result.push([paths]);
        } else {
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
