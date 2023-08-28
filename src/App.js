import { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider"
import Login from "./components/Signup/Login";
import Signup from "./components/Signup/Signup"
import { AuthProvider } from "./UserContext";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [loginIsShown,setLoginIsShown]=useState(false);
  const[RegisterIsShown,setRegisterIsShown]=useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler=()=>{
    setCartIsShown(false);
  }

  const showLoginHandler = () => {
    setLoginIsShown(true);
  };

  const hideLoginHandler=()=>{
    setLoginIsShown(false);
  }

  const showRegisterHandler=()=>{
    setRegisterIsShown(true);
  }

  const hideRegisterHandler=()=>{
    setRegisterIsShown(false);
  }
  return (
    <AuthProvider>
    <CartProvider>
  {cartIsShown && <Cart onClose={hideCartHandler}/>}
  {loginIsShown && <Login onCloseLogin={hideLoginHandler}/>}
  {RegisterIsShown && <Signup onCloseRegister={hideRegisterHandler}/>}
      <Header onShow={showCartHandler} onShowLogin={showLoginHandler} onShowRegister={showRegisterHandler}/>
      <main>
        <Meals />
      </main>
    </CartProvider>
    </AuthProvider>
  );
}

export default App;
