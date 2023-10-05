import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
// import axios from "axios";
import authService from "../../services/auth.service";

//representa una parte de la funcionalidad de un carrito de compras de la web

function Cart() {
  const [sessionId, setSessionId] = useState(null);

    async function createPaymentSession() {
      let orderResponse = await authService.api.post("http://localhost:5005/api/orders/create/"
      );
      setSessionId(orderResponse.data);

      const orderId = orderResponse.data.orderId;
      const stripe = await loadStripe("pk_test_51NworTIamvwN9XVUOROW2KekjqXq8JjSZENPuI9WKEuJ4HWyscjw1G6ZXh8MAPKy9nVXQlFlgak49n8XXJcb5G2F00ucmpwsQE");
    // 1//enviar  create order al backend
    let  sessionResponse = await authService.api.post("http://localhost:5005/api/stripe/createSession/",{orderId: orderId,
  });
    const session = sessionResponse.data.session;
    // 2 post devuelve- order

    // usamos order.strapiID
const result = await stripe.redirectToCheckout({
  sessionId: session.id,

});

   
    // const result = stripe.redirectToCheckout({
    //   sessionId: order.strapiID ,
    // }); 

    if (result.error) {
      console.error(result.error);
    } else {
      
    }
  }


  return (
    <div>
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
