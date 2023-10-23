import React, { useState, useEffect } from "react";
import authService from "../services/auth.service";
import {  useNavigate } from "react-router-dom";
const AuthContext = React.createContext();
function AuthProviderWrapper(props) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  // const [cart, setCart] = useState([]);
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
      } 
      setCartCounter(carrito.length)
  }
  
  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };
  const authenticateUser = async () => {
    // Get the stored token from the localStorage
    const storedToken = localStorage.getItem("authToken");
    // If the token exists in the localStorage
    if (storedToken) {
      // Send a request to the server using axios
      /* 
        axios.get(
          `${process.env.REACT_APP_SERVER_URL}/auth/verify`,
          { headers: { Authorization: `Bearer ${storedToken}` } }
        )
        .then((response) => {})
        */
      // Or using a service
      return await authService
        .verify()
        .then((response) => {
          // If the server verifies that JWT token is valid  ✅
          const userData = response.data;
          // Update state variables
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
          // If the server sends an error response (invalid token) ❌
          // Update state variables
          setIsLoggedIn(false);
          setIsLoading(false);
          setUser(null);
        });
    } else {
      // If the token is not available
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  };
  const removeToken = () => {
    localStorage.removeItem("authToken");
  };
  const logOutUser = () => {
    // Upon logout, remove the token from the localStorage
    removeToken();
    authenticateUser();
    localStorage.setItem("cart","[]")
    navigate("/login")
  };
  useEffect(() => {
    // Run this code once the AuthProviderWrapper component in the App loads for the first time.
    // This effect runs when the application and the AuthProviderWrapper component load for the first time.
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