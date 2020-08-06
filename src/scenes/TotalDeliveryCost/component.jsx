import React, { useState } from "react";
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
      <form className="app__form" onSubmit={handleClick}>
        <div>
          <label
            htmlFor="paths"
            className="app__label"
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
            className="app__input"
            required
            pattern="([a-zA-Z]{2}\d+(,||\s))+"
            title="Please enter text in the form of AB1,BC2,CD3"
            data-testid="app__input__paths"
          />
        </div>
        <div>
          <label
            htmlFor="route"
            className="app__label"
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
            className="app__input"
            required
            pattern="^([a-zA-z]{1})+(-[a-zA-Z]{1})*"
            title="Please enter text in the form of A-B-E"
            data-testid="app__input__routes"
          />
        </div>
        <input
          type="submit"
          value="Calculate"
          className="app__btn"
          data-testid="app__button__calculate"
        />
      </form>
      <p className="app__result" data-testid="app__text__result">
        {result}
      </p>
    </div>
  );
}

export default TotalDeliveryCost;
