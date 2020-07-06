import React from "react";
import "../styles/App.css";
import NavBar from "./NavBar";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import AddProperty from "./AddProperty";
import Properties from "./Properties";

const App = () => (
  <div>
    <NavBar />
    <Switch>
      <Route exact path="/" component={Properties} />
      <Route exact path="/add-property" component={AddProperty} />
    </Switch>
  </div>
);

export default App;
