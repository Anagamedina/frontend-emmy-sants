import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import authService from "../../services/auth.service";

function Cart() {
  const [sessionId, setSessionId] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const [productsCart, setProductCart] = useState( JSON.parse(localStorage.getItem("cart")) );


  function handleSubmit(){
  //  let body=
    createPaymentSession("body")
  }
  // Función para crear una sesión de pago al hacer clic en el botón "Pagar"
  async function createPaymentSession() {
    try {
      //  solicitud al backend para crear un nuevo pedido
      const orderResponse = await authService.api.post("http://localhost:5005/api/orders/create/",{
         products:[ {
                 "product": "65109609ea5efa2ff1a74838",
                 "amount": 4
             }] 
      });
      console.log(orderResponse);
  
      if (orderResponse.data && orderResponse.data._id) {
        // Obtiene el ID del pedido creado
        const orderId = orderResponse.data._id;

        // Carga la biblioteca de Stripe con tu clave pública
        const stripe = await loadStripe("pk_test_51NworTIamvwN9XVUOROW2KekjqXq8JjSZENPuI9WKEuJ4HWyscjw1G6ZXh8MAPKy9nVXQlFlgak49n8XXJcb5G2F00ucmpwsQE");
  
        // sesión de pago en Stripe utilizando el orderId obtenido del backend
        // const sessionResponse = await authService.api.post("http://localhost:5005/api/stripe/createSession/", { orderId });
        // const session = sessionResponse.data.session;
  
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

  // Función para cargar el historial de pedidos cuando se carga el componente
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

    // Llama a la función para cargar el historial de pedidos cuando se carga el componente
    loadOrderHistory();
  }, []);

  return (
    <div>
      <h2>Productos de carrito</h2>
     
      <ul class="list-group">

        {productsCart.map((prod) => (
          <li class="list-group-item" key={prod._id}>
             <p>name: {prod.nombre}</p>

        <input placeholder="qty" value={1}></input>
          </li>
        ))}
      </ul>
      <br />
      <br />
      <br />
      <br />
      <br />
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
