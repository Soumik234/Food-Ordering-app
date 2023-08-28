import React, { useState } from "react";
import axios from "axios";
import Modal from "../UI/Modal";
import { useAuth } from "../../UserContext";
import classes from "./Login.module.css";

const isNotEmpty = (value) => value.trim() !== "";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLogged, setLoginStatus, loginStatus } = useAuth();

  const handleSetIsLogged = (newValue) => {
    setIsLogged(newValue);
  };

  const login = async (e) => {
    e.preventDefault();
    console.log("Logging in with:", username, password);

    if (!isNotEmpty(username) || !isNotEmpty(password)) {
      setLoginStatus("Please enter both username and password.");
      return;
    }

    try {
      const response = await axios.post(
        "https://food-ordering-backend-lc7d.onrender.com/api/meals/login",
        {
          username: username,
          password: password,
        }
      );

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        handleSetIsLogged(true);
        props.onCloseLogin();
      } else {
        setLoginStatus("Login unsuccessful. Please check your credentials.");
      }
    } catch (error) {
      setLoginStatus("Login unsuccessful. Please check your credentials.");
      console.error("Login error:", error);
    }
  };

  return (
    <div>
      <Modal onCloseLogin={props.onCloseLogin}>
        <form className={classes.form} onSubmit={login}>
          <div className={classes.control}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={classes.actions}>
            <button type="button" onClick={props.onCloseLogin}>
              Close
            </button>
            <button type="button" onClick={login} className={classes.submit}>
              Login
            </button>
          </div>
        </form>
        <p>{loginStatus}</p>
      </Modal>
    </div>
  );
};

export default Login;
