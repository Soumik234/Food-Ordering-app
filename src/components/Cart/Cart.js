import { useContext, useState } from "react";
import axios from "axios";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";
import { Fragment } from "react/cjs/react.production.min";
import { useAuth } from "../../UserContext";
import Login from "../Signup/Login";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `₹${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const { isLogged, setIsLogged,setLoginStatus,loginStatus } = useAuth();

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };


  const submitOrderHandler = async (userData) => {
    if(!isLogged){
      console.log("Please log in to place your order.");
      setIsLoginModalOpen(true);
      setLoginStatus("Please Login before ordering..");
      return;
    }
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "https://food-ordering-backend-lc7d.onrender.com/api/meals/submit",
        {
          user: userData,
          orderedItems: cartCtx.items,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(response.data.message);
      setIsSubmitting(false);
      setSubmitted(true);
      cartCtx.clearCart();
    } catch (error) {
      console.error("Error submitting order:", error);
      console.error("Error submitting order:", error);
    setIsSubmitting(false); 
    localStorage.removeItem('token');
    console.log(error.response);
    }
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalAction = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onCLose} />
      )}
      {!isCheckout && modalAction}
    </Fragment>
  );

  const isSubmittingModalContent = <p>Receiving order data...</p>;

  const submittedModalContent = (
    <Fragment>
      <p>Successfully placed your order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !submitted && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {submitted && submitted && submittedModalContent}
      {isLoginModalOpen && !isLogged && (
        <Login onCloseLogin={() => setIsLoginModalOpen(false)} /> 
      )}
    </Modal>
  );
};

export default Cart;
