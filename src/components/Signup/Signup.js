import { useState } from "react";
import axios from "axios";
import Modal from "../UI/Modal";
import classes from "./Signup.module.css"

const isNotEmpty = (value) => value.trim() !== "";

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [registerStatus,setregisterStatus]=useState("");

  const register = () => {
    if (!isNotEmpty(username) || !isNotEmpty(email) || !isNotEmpty(phone) || !isNotEmpty(password)) {
      setregisterStatus("Please fill in all required fields.");
      return;
    
    }
    axios.post("https://food-ordering-backend-lc7d.onrender.com/api/meals/register", {
      username: username,
      email: email,
      phone: phone,
      password: password
    })
    .then((response) => {
      if (response.data.message) {
        setregisterStatus(response.data.message);
      }
    })
    .catch((error) => {
      if (error.response) {
        console.log("Server Response Data:", error.response.data);
      }
      setregisterStatus("An error occurred during registration.");
      console.error("Registration error:", error);
    });
  }

  return (
    <div>
      <Modal onCloseRegister={props.onCloseRegister}>
        <form className={classes.form} onSubmit={register}>
        <div className={classes.control}>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className={classes.control}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className={classes.control}>
          <label htmlFor="phone">Phone Number:</label>
          <input type="number" id="phone" onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Set password:</label>
          <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className={classes.actions}>
        <button type="button" onClick={props.onCloseRegister}>Close</button>
        <button type="button" onClick={register} className={classes.submit}>
        Register
        </button>
        </div>
        </form>
        <p>{registerStatus}</p>
      </Modal>
    </div>
  );
};

export default Register;
