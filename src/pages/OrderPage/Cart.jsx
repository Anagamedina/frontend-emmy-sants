import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

function Cart() {
    async function createPaymentSession() {
      const stripe = await loadStripe("pk_test_51NworTIamvwN9XVUOROW2KekjqXq8JjSZENPuI9WKEuJ4HWyscjw1G6ZXh8MAPKy9nVXQlFlgak49n8XXJcb5G2F00ucmpwsQE");
    // 1//enviar  create order al backend
    // 

    // 2 post devuelve- order

    // usamos order.strapiID


   
    // const result = stripe.redirectToCheckout({
    //   sessionId: order.strapiID ,
    // }); 
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
