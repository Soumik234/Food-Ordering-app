import { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider"
import Login from "./components/Signup/Login";
import Signup from "./components/Signup/Signup"
import { AuthProvider } from "./UserContext";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";

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
      
        
      
      <BrowserRouter>
        <Routes>
          <Route index element={<Meals/>}/>
          <Route path="success"  element={<Success/>} />
          <Route path="cancel"  element={<Cancel/>} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
    </AuthProvider>
  );
}

export default App;
