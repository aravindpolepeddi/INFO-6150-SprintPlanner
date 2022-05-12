// Code for the LoginForm
import React, { useEffect, useState } from "react";
import "./Login.scss";
import Button from "react-bootstrap/Button";
import Dashboard from "./Dashboard";
import userApis from "../services/user-service";
function LoginForm() {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState();
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    name: "",
    emailId: "",
    password: "",
    role: "",
    projectId: [],
  });

  //checks if user is logged in on everytime page loads
  useEffect(() => {
    const loggedInUserToken = localStorage.getItem("userToken");
    if (loggedInUserToken) {
      const foundUserToken = JSON.stringify(loggedInUserToken);
      setToken(foundUserToken);
    }
  }, []);

  //on submit button
  const submitHandler = async (e) => {
    e.preventDefault();
    const obj = { emailId, password };
    userApis
      .loggedInUser(obj)
      .then((response) => response.json())
      .then((result) => {
        if (!result.hasOwnProperty("error")) {
          setToken(result.token);
          setUser(result.user);
          //storing details in localStorage to access post login
          localStorage.setItem("userToken", result.token);
          localStorage.setItem("emailId", result.user.emailId);
        } else {
          setError(result.error);
        }
      });
  };

  //if user exists only then allow to view dashboard
  if (token) {
    console.log("User token", token);
    console.log("User in LogIn", user);
    return <Dashboard user={user}></Dashboard>;
  }

  return (
    <div className="App">
      <form className="loginForm" onSubmit={submitHandler}>
        <div className="form-inner">
          <h2>Login</h2>
          {/* checks for error */}
          {error !== "" ? <div className="error">{error}</div> : ""}
          <div className="form-group">
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              name="emailId"
              id="emailId"
              onChange={(e) => setEmailId(e.target.value)}
              value={emailId}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password"> Password: </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <Button type="submit">Login</Button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
