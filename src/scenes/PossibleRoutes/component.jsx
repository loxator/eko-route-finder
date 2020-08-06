import React, { useState } from "react";
import Graph from "../../models/Graph";
import "./styles.css";

const PossibleRoutes = (props) => {
  const [paths, setPaths] = useState("");
  const [source, setSournce] = useState("");
  const [target, setTarget] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const myGraph = new Graph();

  const populateGraph = (arr) => {
    for (let value of arr) {
      if (!(value.charAt(0) in myGraph.adjacentList)) {
        myGraph.addVertex(value.charAt(0));
      }
      myGraph.addEdge(value.charAt(0), {
        to: value.charAt(1),
        distance: parseInt(value.slice(2), 10),
      });
    }
  };

  const handleClick = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    populateGraph(paths.split(","));
    let routesResult = myGraph.getPossibleRoutesBFS({ to: source }, target);
    if (!routesResult.error) {
      setResult(routesResult);
    } else setError(routesResult.text.message);
  };
  return (
    <div className="routes__wrapper">
      <form className="app__form" onSubmit={handleClick}>
        <div>
          <label
            htmlFor="paths"
            className="app__label"
            data-testid="routes__label__paths"
          >
            Paths:
          </label>
          <br></br>
          <input
            type="text"
            onChange={(e) =>
              setPaths(e.target.value.toUpperCase().replace(/\s/g, ""))
            }
            value={paths}
            id="paths"
            className="app__input"
            required
            pattern="([a-zA-Z]{2}\d+(,||\s))+"
            title="Please enter text in the form of AB1,BC2,CD3"
            data-testid="routes__input__paths"
          />
        </div>
        <div>
          <label
            htmlFor="source"
            className="app__label"
            data-testid="routes__label__source"
          >
            Source:
          </label>
          <br></br>
          <input
            type="source"
            onChange={(e) =>
              setSournce(e.target.value.toUpperCase().replace(/\s/g, ""))
            }
            value={source}
            id="paths"
            className="app__input"
            required
            pattern="[a-zA-Z]{1}"
            title="Please enter a letter"
            data-testid="routes__label__source"
          />
        </div>
        <div>
          <label
            htmlFor="target"
            className="app__label"
            data-testid="routes__label__target"
          >
            Target:
          </label>
          <br></br>
          <input
            type="text"
            onChange={(e) =>
              setTarget(e.target.value.toUpperCase().replace(/\s/g, ""))
            }
            value={target}
            id="target"
            className="app__input"
            required
            pattern="[a-zA-Z]{1}"
            title="Please enter a letter"
            data-testid="routes__input__target"
          />
        </div>
        <input
          type="submit"
          value="Calculate"
          className="app__btn"
          data-testid="routes__button__calculate"
        />
      </form>
      {result.length && !error && (
        <div className="app__result" data-testid="routes__text__result">
          <p>Routes found: {result.length}</p>
          {result.map((res) =>
            res.map((route, index) => <p key={index}>{route}</p>)
          )}
        </div>
      )}
      {error && (
        <p className="routes__error" data-testid="routes__text__error">
          {error}
        </p>
      )}
    </div>
  );
};

export default PossibleRoutes;
