import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import authService from "../../services/auth.service.js"; // Asegúrate de importar authService correctamente

function SuccessTransactionPage() {
  const [order, setOrder] = useState({});

  useEffect(() => {
    const start = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const id = queryParams.get("id");

      await authService.api.get(
        "http://localhost:5005/api/stripe/checkPayment/" + id
      );

      let orderRes = await authService.api.get(
        "http://localhost:5005/api/orders/orders/" + id
      );
      setOrder(orderRes.data);
    };

    try {
      start();
    } catch (e) {

      console.log(e)
    }
  }, []);

  return (
    <div style={{ "white-space": "pre" }}>
      <br />
      <br />
      <br />
      <br />

      {JSON.stringify(order, null, 4)}
      <br />
      <br />
    </div>
  );
}
export default SuccessTransactionPage;
// "651daee1f23e47b2e9f830c6"
