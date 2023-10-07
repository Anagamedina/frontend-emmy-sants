import React, { useState, useEffect } from "react";
import authService from "../../services/auth.service.js";


//http://localhost:3000/success?id=652113715d337963c72f0c43

function Success() {
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get("id");
        console.log("aqui");
        // Llama a la API para verificar el estado de pago en Stripe
        await authService.api.get(
          `http://localhost:5005/api/stripe/checkPayment/${id}`
        );

        // Llama a la API para obtener los detalles de la orden 
        const orderRes = await authService.api.get(
          `http://localhost:5005/api/orders/orders/${id}` 
        );

        setOrder(orderRes.data);
        setLoading(false);
      } catch (error) {
        setError("Error al cargar los detalles de la orden.");
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <pre>{JSON.stringify(order, null, 4)}</pre>
      )}
    </div>
  );
}

export default Success;

// "651daee1f23e47b2e9f830c6"
