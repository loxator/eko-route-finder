import Graph from "./Graph";
describe("Graph", () => {
  test("should initialize a new graph object", () => {
    const mockGraph = new Graph();
    expect(mockGraph.adjacentList).toEqual({});
    expect(mockGraph.numberOfNodes).toEqual(0);
  });
  test("should addVertex to graph object", () => {
    const mockGraph = new Graph();
    mockGraph.addVertex("A");
    expect(mockGraph.adjacentList).toEqual({ A: [] });
    expect(mockGraph.numberOfNodes).toEqual(1);
  });
  test("should addEdge to graph object", () => {
    const mockGraph = new Graph();
    mockGraph.addVertex("A");
    mockGraph.addEdge("A", {
      to: "B",
      distance: 10,
    });
    expect(mockGraph.adjacentList).toEqual({ A: [{ to: "B", distance: 10 }] });
    expect(mockGraph.numberOfNodes).toEqual(1);
  });
  test("should throw error for addEdge if called without any args", () => {
    const mockGraph = new Graph();
    expect(mockGraph.addEdge).toThrow(TypeError);
    expect(mockGraph.numberOfNodes).toEqual(0);
  });
  test("should  getPossibleRoutesBFS for graph object", () => {
    const mockGraph = new Graph();
    mockGraph.addVertex("A");
    mockGraph.addVertex("B");
    mockGraph.addVertex("C");
    mockGraph.addVertex("D");

    mockGraph.addEdge("A", {
      to: "B",
      distance: 10,
    });
    mockGraph.addEdge("A", {
      to: "C",
      distance: 7,
    });
    mockGraph.addEdge("A", {
      to: "D",
      distance: 12,
    });
    mockGraph.addEdge("B", {
      to: "D",
      distance: 2,
    });
    mockGraph.addEdge("C", {
      to: "B",
      distance: 4,
    });
    expect(mockGraph.getPossibleRoutesBFS({ to: "A" }, "D")).toEqual([
      ["A", "D"],
      ["A", "B", "D"],
      ["A", "C", "B", "D"],
    ]);
  });
  test("should throw error for getPossibleRoutesBFS if start doesn't exist", () => {
    const mockGraph = new Graph();
    mockGraph.addVertex("A");
    mockGraph.addVertex("B");
    mockGraph.addVertex("C");
    mockGraph.addVertex("D");

    mockGraph.addEdge("A", {
      to: "B",
      distance: 10,
    });
    mockGraph.addEdge("A", {
      to: "C",
      distance: 7,
    });
    mockGraph.addEdge("A", {
      to: "D",
      distance: 12,
    });
    mockGraph.addEdge("B", {
      to: "D",
      distance: 2,
    });
    mockGraph.addEdge("C", {
      to: "B",
      distance: 4,
    });
    expect(mockGraph.getPossibleRoutesBFS({ to: "Z" }, "D")).toEqual({
      error: true,
      text: "The start route does not exist",
    });
  });
  test("should throw error for getPossibleRoutesBFS if end doesn't exist", () => {
    const mockGraph = new Graph();
    mockGraph.addVertex("A");
    mockGraph.addVertex("B");
    mockGraph.addVertex("C");
    mockGraph.addVertex("D");

    mockGraph.addEdge("A", {
      to: "B",
      distance: 10,
    });
    mockGraph.addEdge("A", {
      to: "C",
      distance: 7,
    });
    mockGraph.addEdge("A", {
      to: "D",
      distance: 12,
    });
    mockGraph.addEdge("B", {
      to: "D",
      distance: 2,
    });
    mockGraph.addEdge("C", {
      to: "B",
      distance: 4,
    });
    expect(mockGraph.getPossibleRoutesBFS({ to: "A" }, "Z")).toEqual({
      error: true,
      text: "The end route does not exist",
    });
  });
});
