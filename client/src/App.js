import React, { useState, useEffect } from "react";

import "./App.css";
import { Table } from "./components/Table";

let fd = {};

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [invalid, setInvalid] = useState(false);

  const loginFunction = async () => {
    fd.username = username;
    fd.password = password;
    console.log(fd);
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      /* mode: "cors", */
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fd),
    });
    const token = await response.json();
    if (token.token) {
      setToken(token.token);
      setLoggedIn(true);
      console.log(token);
    } else {
      setInvalid(true);
    }
  };

  return (
    <div className="App">
      <div className="container content inputBox">
        {token ? (
          <Table token={token} loggedIn={loggedIn} />
        ) : (
          <div className="box">
            <h1 className="h1">Please Log In</h1>
            <div className="field">
              <label className="label">Username</label>
              <input
                className="input"
                type="text"
                name="username"
                id="username"
                placeholder="Username goes here"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="field">
              <label className="label">Password</label>
              <input
                className="input"
                type="password"
                name="password"
                id="password"
                placeholder="Password goes here"
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    loginFunction();
                  }
                }}
              />
            </div>
            {invalid ? (
              <div className="mb-4">
                <span className="is-danger">Wrong username or password</span>
              </div>
            ) : (
              <div></div>
            )}
            <button
              className="button is-dark is-outlined"
              disabled={loggedIn}
              onClick={() => loginFunction()} /* type="submit" */
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
