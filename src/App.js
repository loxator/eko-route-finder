import React, { useState } from "react";
import "./App.css";
import { computeTotalDeliveryCost } from "./utils/helpers";

function App() {
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
    <div className="App">
      <form className="Form" onSubmit={handleClick}>
        <div>
          <label htmlFor="paths" className="Label">
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
          />
        </div>
        <div>
          <label htmlFor="route" className="Label">
            Route:
          </label>
          <br></br>
          <input
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
          />
        </div>
        <input type="submit" value="Calculate" className="btn" />
      </form>
      {result ? <p className="Result">{result}</p> : null}
    </div>
  );
}

export default App;
