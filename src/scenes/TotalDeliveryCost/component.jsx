import React, { useState } from "react";
import { computeTotalDeliveryCost } from "../../utils/helpers/helpers";
import Input from "../../components/Input/component";
import { Link } from "react-router-dom";
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
      <Link className="app__link" to="/routes">
        Possible Routes
      </Link>
      <form className="app__form" onSubmit={handleClick}>
        <h2>Total Delivery Cost</h2>
        <Input
          labelTestId="tdc__label__paths"
          inputId="paths"
          inputTestId="tdc__input__paths"
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
          labelTestId="tdc__label__routes"
          inputId="route"
          inputTestId="tdc__input__routes"
          onChangeHandler={(e) =>
            setRoute(e.target.value.toUpperCase().replace(/\s/g, ""))
          }
          pattern="^([a-zA-z]{1})+(-[a-zA-Z]{1})*"
          title="Please enter text in the form of A-B-E"
          labelText="Route:"
          inputValue={route}
        />
        <br />
        <input
          type="submit"
          value="Calculate"
          className="app__btn"
          data-testid="tdc__button__calculate"
        />
      </form>
      <p className="app__result" data-testid="tdc__text__result">
        {result}
      </p>
    </div>
  );
}

export default TotalDeliveryCost;
