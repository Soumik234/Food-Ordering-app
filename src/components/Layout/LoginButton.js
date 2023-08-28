import React from "react";
import classes from './LoginButton.module.css'
import { useAuth } from "../../UserContext";

const LoginButton = (props) => {
  const { isLogged, setIsLogged, setLoginStatus } = useAuth();

  const handleLogout = () => {
    setLoginStatus("");
    setIsLogged(false);
  };

  return (
    <button
      className={`${classes.button} ${isLogged ? classes.logoutButton : ''}`}
      onClick={isLogged ? handleLogout : props.onClick}
    >
      {isLogged ? "Logout" : props.name}
    </button>
  );
};

export default LoginButton;
