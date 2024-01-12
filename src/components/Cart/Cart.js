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
  const { isLogged, setLoginStatus } = useAuth();

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const checkout = async () => {
    try {
      console.log("Checkout function called");
      const response = await fetch("https://food-ordering-backend-euky.vercel.app/api/meals/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: cartCtx.items }),
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData && responseData.url) {
          window.location.assign(responseData.url);
        } else {
          console.error("Error during checkout: Missing URL in the response");
        }
      } else {
        console.error("Error during checkout:", response.statusText);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const orderHandler = () => {
    if (!isLogged) {
      setIsLoginModalOpen(true);
      setLoginStatus(<strong>Please Login before ordering..</strong>);
      return;
    }
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "https://food-ordering-backend-euky.vercel.app/api/meals/submit",
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
      // cartCtx.clearCart();
    } catch (error) {
      console.error("Error submitting order:", error);
      console.error("Error submitting order:", error);
      setIsSubmitting(false);
      localStorage.removeItem("token");
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
      <p>Proceed to payment!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
        <button className={classes.button} onClick={checkout}>
          Checkout
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
