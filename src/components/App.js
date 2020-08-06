import React, { useState } from "react";
import "../styles/App.css";
import NavBar from "./NavBar";
import { Route, Switch } from "react-router-dom";
import AddProperty from "./AddProperty";
import Properties from "./Properties";
import SavedProperties from "./SavedProperties";
import Home from "./Home";

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
      setUserID("");
    });
  };

  return (
    <div className="App">
      <NavBar onLogin={handleLogin} userID={userID} onLogout={handleLogout} />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/view-properties"
          component={() => <Properties userID={userID} />}
        />
        <Route exact path="/add-property" component={AddProperty} />
        <Route
          exact
          path="/saved-properties"
          component={() => (
            <SavedProperties
              userID={userID}
              onLogin={handleLogin}
              onLogout={handleLogout}
            />
          )}
        />
      </Switch>
    </div>
  );
};

export default App;
