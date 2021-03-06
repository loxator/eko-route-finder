import React, { useState } from "react";
import Graph from "../../models/Graph/Graph";
import Input from "../../components/Input/component";
import { Link } from "react-router-dom";
import { computeTotalDeliveryCost } from "../../utils/helpers/helpers";
import "./styles.css";

const PossibleRoutes = (props) => {
  const [paths, setPaths] = useState("");
  const [source, setSource] = useState("");
  const [target, setTarget] = useState("");
  const [stops, setStops] = useState(0);
  const [cost, setCost] = useState(0);
  const [result, setResult] = useState({});
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

  const filterOutRoutesWithStops = (arrayOfRoutes, stops) => {
    if (stops === 0) {
      return arrayOfRoutes;
    }

    return arrayOfRoutes.filter((route) => route.length <= stops + 2);
  };

  const filterOutRoutesWithCost = (arrayOfRoutes, cost) => {
    const result = [];
    const routesWithDeliveryCost = arrayOfRoutes.map((route) =>
      computeTotalDeliveryCost(route, paths.split(","))
    );

    routesWithDeliveryCost.map((cost, index) =>
      result.push({ route: arrayOfRoutes[index], cost: cost })
    );

    if (cost === 0) return result;
    return result.filter((route) => route.cost <= cost);
  };

  const handleClick = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    populateGraph(paths.split(","));
    let routesResult = myGraph.getPossibleRoutesBFS({ to: source }, target);
    if (!routesResult.error) {
      setResult(
        filterOutRoutesWithCost(
          filterOutRoutesWithStops(routesResult, parseInt(stops, 10)),
          parseInt(cost, 10)
        )
      );
    } else setError(routesResult.text);
  };
  return (
    <div>
      <Link className="app__link" to="/">
        Total Delivery Cost
      </Link>
      <form className="app__form" onSubmit={handleClick}>
        <h2>Possible Routes</h2>
        <Input
          labelTestId="routes__label__paths"
          inputId="paths"
          inputTestId="routes__input__paths"
          onChangeHandler={(e) =>
            setPaths(e.target.value.toUpperCase().replace(/\s/g, ""))
          }
          pattern="([a-zA-Z]{2}\d+(,||\s))+"
          title="Please enter text in the form of AB1,BC2,CD3"
          labelText="Paths:"
          inputValue={paths}
        />
        <br />
        <Input
          labelTestId="routes__label__source"
          inputId="source"
          inputTestId="routes__input__source"
          onChangeHandler={(e) =>
            setSource(e.target.value.toUpperCase().replace(/\s/g, ""))
          }
          pattern="[a-zA-Z]{1}"
          title="Please enter a letter"
          labelText="Source:"
          inputValue={source}
          maxLength="1"
        />
        <br />
        <Input
          labelTestId="routes__label__target"
          inputId="target"
          inputTestId="routes__input__target"
          onChangeHandler={(e) =>
            setTarget(e.target.value.toUpperCase().replace(/\s/g, ""))
          }
          pattern="[a-zA-Z]{1}"
          title="Please enter a letter"
          labelText="Target:"
          inputValue={target}
          maxLength="1"
        />
        <br />
        <Input
          labelTestId="routes__label__stops"
          inputId="stops"
          inputTestId="routes__input__stops"
          onChangeHandler={(e) => setStops(e.target.value.charAt(0))}
          pattern="\d{1}"
          title="Please enter a number between 1 - 9"
          labelText="Maximum Stops:"
          inputValue={stops}
          type="number"
          min="0"
          max="9"
        />
        <br />
        <Input
          labelTestId="routes__label__cost"
          inputId="cost"
          inputTestId="routes__input__cost"
          onChangeHandler={(e) =>
            setCost(e.target.value.charAt(0) + e.target.value.charAt(1))
          }
          pattern="\d{2}"
          title="Please enter a number between 1 - 99"
          labelText="Maximum Cost:"
          inputValue={cost}
          type="number"
          min="0"
          max="99"
        />
        <br />
        <input
          type="submit"
          value="Calculate"
          className="app__btn"
          data-testid="routes__button__calculate"
        />
      </form>
      <br />
      {result.length && !error ? (
        <div className="app__result" data-testid="routes__text__result">
          <p>Routes found: {result.length}</p>
          {result.map((route, index) => (
            <p key={index}>
              {route.route} - {route.cost}
            </p>
          ))}
        </div>
      ) : null}
      {error && (
        <p className="routes__error" data-testid="routes__text__error">
          {error}
        </p>
      )}
    </div>
  );
};

export default PossibleRoutes;
