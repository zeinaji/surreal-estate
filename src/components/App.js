import React, { useState } from "react";
import "../styles/App.css";
import NavBar from "./NavBar";
import { Route, Switch } from "react-router-dom";
import AddProperty from "./AddProperty";
import Properties from "./Properties";

const App = () => {
  const initialState = {
    userID: "",
  };
  const [userID, setUserID] = useState(initialState.userID);
  const handleLogin = (response) => {
    setUserID(response.userID);
  };
  const handleLogout = () => {
    window.FB.logout(function (response) {
      console.log(response);
      setUserID("");
    });
  };

  return (
    <div>
      <NavBar onLogin={handleLogin} userID={userID} onLogout={handleLogout} />
      <Switch>
        <Route exact path="/" component={Properties} />
        <Route exact path="/add-property" component={AddProperty} />
      </Switch>
    </div>
  );
};

export default App;
