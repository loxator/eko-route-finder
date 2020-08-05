import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TotalDeliveryCost from "../../scenes/TotalDeliveryCost/component";
import PossibleRoutes from "../../scenes/PossibleRoutes/component";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={TotalDeliveryCost} />
          <Route path="/routes" exact component={PossibleRoutes} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
