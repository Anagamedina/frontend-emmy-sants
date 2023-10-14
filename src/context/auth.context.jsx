import React, { useState, useEffect } from "react";
import authService from "../services/auth.service";
import {  useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);;
  const [showCart, setShowCart] = useState(false); 
  const [cartCounter, setCartCounter] = useState(0); 

  useEffect(()=>{
    setCartVisibility(false)
  },[])

  const setCartVisibility=(v)=> {
    setShowCart(v); 

      let carrito = []  
      let cardLS = localStorage.getItem("cart")
      if(cardLS != null){
        carrito = JSON.parse(cardLS)
        // localStorage.setItem("cart","[]")
      } 
      setCartCounter(carrito.length)
  }

  

  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  const authenticateUser = async () => {
    
    const storedToken = localStorage.getItem("authToken");

    
    if (storedToken) {
 
     
      return await authService
        .verify()
        .then((response) => {
          const userData = response.data;
          
          setIsLoggedIn(true);
          setIsLoading(false);
          setUser(userData);

          console.log(userData)
          return userData
          // if(user?.isAdmin){
          //   navigate("/admin/product"); 
          //  }else{
          //    navigate("/");
          //  }
        })
        .catch((error) => {
        
          setIsLoggedIn(false);
          setIsLoading(false);
          setUser(null);
        });
    } else {
     
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  };

  const removeToken = () => {
    localStorage.removeItem("authToken");
  };

  const logOutUser = () => {
   
    removeToken();
    authenticateUser();

    localStorage.setItem("cart","[]")

    navigate("/login")
  };

  useEffect(() => {

    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        logOutUser,
        showCart,
        setCartVisibility, cartCounter, setCartCounter
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
