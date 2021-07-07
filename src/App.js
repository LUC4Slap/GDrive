import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import { provider, auth } from "./database/firebase";
import Login from "./components/Login";

function App() {
  const [login, setLogin] = useState(null);

  useEffect(() => {
    //Sistema de login persistente
    auth.onAuthStateChanged((val) => {
      if (val) {
        setLogin({
          email: val.email,
          nome: val.displayName,
          imagem: val.photoURL,
        });
      } else {
        setLogin(null);
      }
    });
  }, []);

  const handlelogin = (e) => {
    e.preventDefault();
    auth.signInWithPopup(provider).then((result) => {
      if (result) {
        console.log(result);
        setLogin(result.user);
      }
    });
  };
  return (
    <div className="App">
      {login ? (
        <Router>
          <Switch>
            <Route exact path="/"></Route>

            <Route exact path="/home">
              <Home login={login} />
            </Route>
          </Switch>
        </Router>
      ) : (
        <Login handlelogin={handlelogin} />
      )}
    </div>
  );
}

export default App;
