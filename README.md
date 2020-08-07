# EKO Test

This project aims to provide two solutions for delivery routes:

- Total Delivery Cost - Find the total cost of a route by summation of their weigts
- All Possible Routes - Use Breadth First Search to find all possible routes from point A to point B

---

## Installation

Running `yarn start` will install all dependencies and start the development server at `http://localhost:3000`

---

## Test
Running `yarn test` will start the unit tests which picks up any files ending with suffix `.test.js`

---

## Usage

### Total Delivery Cost

This component will help in finding out if a path exists, given input as a graph and if it exists then calculate the total delivery cost of the route

#### Input 

- Paths - `AB1,AC4,AD10,BE3,CD4,CF2,DE1,EB3,EA2,FD1`
- Route - `A-B-E`
- Output - `4`

---

### Possible Routes

### NOTE

**This component will only accept Directed Acyclic Graphs (DAGs), if a Cyclic graph is given as input, the program will go in an infinite loop and hang. Also, the program cannot find routes if target and source are same**



- Paths - `AB1,AC4,AD10,CD4,CF2,DE1,EB3,EA2,FD1`
- Source - `A`
- Target - `E`
- Maximum Stops - `4` (If `0`, all possible routes without any stops are are shown. Else, the array gets filtered according to `maximumStops`)
- Delivery Cost - `20` (If `0`, all possible routes without any cost are shown. Else, the array gets filtered according to `deliveryCost`)
- Output :

```
3

ADE - 11

ACDE - 9

ACFDE - 8
```
---
