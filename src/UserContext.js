import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [loginStatus,setLoginStatus]=useState("");

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged ,loginStatus,setLoginStatus}}>
      {children}
    </AuthContext.Provider>
  );
};
