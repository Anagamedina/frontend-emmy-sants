import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import authService from "../../services/auth.service";
import   CartIcon from "../../img/Cart";



function Cart() {
  const [sessionId, setSessionId] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  // const [productsCart, setProductCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [productsCart, setProductCart] = useState( JSON.parse(localStorage.getItem("cart")) );



  function handleQuantityChange(product, newQuantity) {
    setProductCart((prevCart) =>
      prevCart.map((p) =>
        p._id === product._id ? { ...p, quantity: parseInt(newQuantity) } : p
      )
    );
  }

  // function handleQuantityChange(product, newQuantity) {
  //   const updatedCart = [...productsCart];
  //   const productIndex = updatedCart.findIndex((p) => p._id === product._id);
  
  //   if (productIndex !== -1) {
  //     updatedCart[productIndex].quantity = newQuantity;
  //     setProductCart(updatedCart);
  //   }
  // }
  

  function incrementQuantity(pid) {
    let prevCart = [...productsCart]
    let prodSelected =  prevCart.find(prod => prod._id === pid ) 
    prodSelected.quantity = prodSelected.quantity+1 || 1 
    setProductCart(prevCart) 
  }

  function decrementQuantity(pid) {
    let prevCart = [...productsCart]
    let prodSelected =  prevCart.find(prod => prod._id === pid ) 
    prodSelected.quantity = ( prodSelected.quantity || 0 )-1 

    if(prodSelected.quantity<0){
      prevCart = prevCart.filter(p=>p._id !== pid) 
      prodSelected.quantity++
    }
    setProductCart(prevCart) 
  }


  async function createPaymentSession() {
    try {
      // Solicitud al backend para crear un nuevo pedido
      const orderResponse = await authService.api.post("http://localhost:5005/api/orders/create/", {
        products: productsCart.map((prod) => ({
          product: prod._id,
          amount: prod.quantity || 0,
        })), 
        totalAmount: totalAmount
      });

      if (orderResponse.data && orderResponse.data._id) {
        // Obtiene el ID del pedido creado
        const orderId = orderResponse.data._id;

        // Carga la biblioteca de Stripe con tu clave pública
        const stripe = await loadStripe("pk_test_51NworTIamvwN9XVUOROW2KekjqXq8JjSZENPuI9WKEuJ4HWyscjw1G6ZXh8MAPKy9nVXQlFlgak49n8XXJcb5G2F00ucmpwsQE");

        // Redirige al usuario a la página de pago de Stripe
        const result = await stripe.redirectToCheckout({ sessionId: orderResponse.data.strapiID });

        if (result.error) {
          console.error(result.error);
        } else {
          // La sesión de pago se manejará en Stripe y en la página de éxito de Stripe
        }
      } else {
        console.error("Error al obtener el orderId desde el backend.");
      }
    } catch (error) {
      console.error("Error al crear la sesión de pago:", error);
    }
  }

  useEffect(() => {
    async function loadOrderHistory() {
      try {
        // Realiza una solicitud al backend para obtener el historial de pedidos del usuario
        const response = await authService.api.get("http://localhost:5005/api/orders/history");

        if (response.data) {
          // Actualiza el estado con el historial de pedidos
          setOrderHistory(response.data);
        }
      } catch (error) {
        console.error("Error al cargar el historial de pedidos:", error);
      }
    }

    loadOrderHistory();
  }, []);

  useEffect(() => {
    // Calcula el total de la compra en función de la cantidad y el precio de los productos
    const total = productsCart.reduce((accumulator, product) => {
      return accumulator + (product.quantity||0) * product.precio;
    }, 0);
    setTotalAmount(total); 
    
    localStorage.setItem("cart",JSON.stringify(productsCart))
  }, [productsCart]);

  return (
    <div>
      <h2><CartIcon></CartIcon> Productos de carrito</h2>

      <ul className="list-group">
        {productsCart.map((prod) => (
          <li className="list-group-item" key={prod._id}>
            <p>Nombre: {prod.nombre}</p>
            <p>Precio: {prod.precio}</p>
            <input
              type="number"
              placeholder="Cantidad"
              value={prod.quantity || 0}
              onChange={(e) => handleQuantityChange(prod, e.target.value)}
            />
            <button className="btn btn-info" onClick={() => incrementQuantity(prod._id)}>+</button>
            <button className="btn btn-info"  onClick={() => decrementQuantity(prod._id)}>-</button>
          </li>
        ))}
      </ul>
      <br />
      <p>Total a pagar: {totalAmount || 0}</p>
      <br />
      <input
        onClick={() => createPaymentSession()}
        type="button"
        value="Pagar"
      />
    </div>
  );
}

export default Cart;


