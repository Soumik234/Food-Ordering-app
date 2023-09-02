/* eslint-disable jsx-a11y/img-redundant-alt */
import { Fragment } from "react";
import HeaderCartButton from "./HeaderCartButton";
import mealsImage from "../../assets/meal.jpg";
import classes from "./Header.module.css";
import LoginButton from "./LoginButton";
import { useAuth } from "../../UserContext";

const Header = (props) => {
  const { isLogged } = useAuth();
  console.log("Header component - isLogged:", isLogged);
 
  return (
    <Fragment>
    <header className={classes.header}>
      <h1>Somato</h1>
      {isLogged ? (
        <LoginButton name="Logout" onLoginSuccess={props.onLoginSuccess} />
      ) : (
        <div className={classes.loginButtonsContainer}> 
            <LoginButton
              name="Login"
              onClick={props.onShowLogin}
              onLoginSuccess={props.onLoginSuccess}
            />
            <LoginButton name="Signup" onClick={props.onShowRegister} />
          </div>
      )}
      <HeaderCartButton onClick={props.onShow} />
    </header>
    <div className={classes["main-image"]}>
      <img src={mealsImage} alt="Image of food" />
    </div>
  </Fragment>
  );
};

export default Header;
