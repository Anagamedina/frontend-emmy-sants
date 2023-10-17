/*eslint-disable*/
import React, { useState, useEffect,useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import authService from "../../services/auth.service";
import CartIcon from "../../img/Cart";
import { AuthContext } from "../../context/auth.context";
import { Link } from "react-router-dom";

import "../../utils/Cart.css"

function Cart() {
  const { user, setCartVisibility, setCartCounter } = useContext(AuthContext);
  const [totalAmount, setTotalAmount] = useState(0);
  const [productsCart, setProductCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);

  function handleQuantityChange(pid, newQuantity) {
    let prevCart = [...productsCart];
    let prodSelected = prevCart.find((prod) => prod._id === pid);
    prodSelected.quantity = parseInt(newQuantity);
    setProductCart(prevCart);
  }

  function incrementQuantity(pid) {
    let prevCart = [...productsCart];
    let prodSelected = prevCart.find((prod) => prod._id === pid);
    prodSelected.quantity = prodSelected.quantity + 1 || 1;
    setProductCart(prevCart);
  }

  function decrementQuantity(pid) {
    let prevCart = [...productsCart];
    let prodSelected = prevCart.find((prod) => prod._id === pid);
    prodSelected.quantity = (prodSelected.quantity || 0) - 1;

    if (prodSelected.quantity < 0) {
      prevCart = prevCart.filter((p) => p._id !== pid);
      prodSelected.quantity++;
    }
    setProductCart(prevCart);
  }

  function removeFromCart(pid) {
    let prevCart = [...productsCart];
    prevCart = prevCart.filter((p) => p._id !== pid);
    setProductCart(prevCart);
  }

  async function createPaymentSession() {
    const backendUrl = process.env.REACT_APP_SERVER_URL;
    
    try {
      const orderResponse = await authService.api.post(
        `${backendUrl}/api/orders/create` ,
        {
          products: productsCart.map((prod) => ({
            product: prod._id,
            amount: prod.quantity || 0,
          })),
          totalAmount: totalAmount,
        }
      );

      if (orderResponse.data && orderResponse.data._id) {
        const orderId = orderResponse.data._id;
        const stripe = await loadStripe(
          "pk_test_51NworTIamvwN9XVUOROW2KekjqXq8JjSZENPuI9WKEuJ4HWyscjw1G6ZXh8MAPKy9nVXQlFlgak49n8XXJcb5G2F00ucmpwsQE"
        );

        localStorage.setItem("cart","[]")
        const result = await stripe.redirectToCheckout({
          sessionId: orderResponse.data.strapiID,
        });

        if (result.error) {
          console.error(result.error);
        }
      } else {
        console.error("Error al obtener el orderId desde el backend.");
      }
    } catch (error) {
      console.error("Error al crear la sesión de pago:", error);
    }
  }

  useEffect(() => {
    const total = productsCart.reduce((accumulator, product) => {
      return accumulator + (product.quantity || 0) * product.precio;
    }, 0);
    setTotalAmount(total);
    localStorage.setItem("cart", JSON.stringify(productsCart));
  }, [productsCart]);

  return (
    <div className="cart">
      <div className="closeButton" onClick={() => setCartVisibility(false)}>
        X
      </div>
      <h2>
        <CartIcon></CartIcon> Productos de carrito
      </h2>

      <ul className="list-group">
        {productsCart.map((prod) => (
          <li className="list-group-item" key={prod._id}>
            <span onClick={() => removeFromCart(prod._id)} className="closeButton">
              x
            </span>
            <p>Nombre: {prod.nombre}</p>
            <p>Precio: {prod.precio}</p>
            <div className="separated">
            <input
              type="number"
              placeholder="Cantidad"
              value={prod.quantity || 0}
              onChange={(e) => handleQuantityChange(prod._id, e.target.value)}
              style={{ width: "60px" }}
            />
            <button
              className="btn   mas"
              onClick={() => incrementQuantity(prod._id)}
            >
              +
            </button>
            <button
              className="btn   menos"
              onClick={() => decrementQuantity(prod._id)}
            >
              -
            </button>
            </div>
          </li>
        ))}
      </ul>
      <br />
      <p>Total a pagar: {totalAmount || 0} €</p>
      <br />
      <Link className="btn btn-secondary " to="/">Seguir comprando</Link>
      <br />
      <br />

      {user && (
        <input
          onClick={() => createPaymentSession()}
          type="button"
          value="Pagar"
        />
      )}
      {!user && <p> Por favor, registrate o inicia sesión para realizar tu pedido.</p>}
    </div>
  );
}

export default Cart;