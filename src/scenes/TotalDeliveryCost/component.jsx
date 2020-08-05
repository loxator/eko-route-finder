import React, { useState } from "react";
import "./styles.css";
import { computeTotalDeliveryCost } from "../../utils/helpers/helpers";

function TotalDeliveryCost() {
  const [paths, setPaths] = useState("");
  const [route, setRoute] = useState("");
  const [result, setResult] = useState("");

  const handleClick = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    await setResult(
      computeTotalDeliveryCost(route.split("-"), paths.split(","))
    );
  };
  return (
    <div>
      <form className="Form" onSubmit={handleClick}>
        <div>
          <label
            htmlFor="paths"
            className="Label"
            data-testid="app__label__paths"
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
            className="Input"
            required
            pattern="([a-zA-Z]{2}\d+(,||\s))+"
            title="Please enter text in the form of AB1,BC2,CD3"
            data-testid="app__input__paths"
          />
        </div>
        <div>
          <label
            htmlFor="route"
            className="Label"
            data-testid="app__label__routes"
          >
            Route:
          </label>
          <br></br>
          <input
            id="route"
            type="text"
            onChange={(e) =>
              setRoute(e.target.value.toUpperCase().replace(/\s/g, ""))
            }
            value={route}
            className="Input"
            required
            //pattern="(.*?)-([a-zA-Z]){1}"
            pattern="^([a-zA-z]{1})+(-[a-zA-Z]{1})*"
            title="Please enter text in the form of A-B-E"
            data-testid="app__input__routes"
          />
        </div>
        <input
          type="submit"
          value="Calculate"
          className="btn"
          data-testid="app__button__calculate"
        />
      </form>
      <p className="Result" data-testid="app__text__result">
        {result}
      </p>
    </div>
  );
}

export default TotalDeliveryCost;
