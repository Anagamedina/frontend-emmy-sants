// import React, { useState, useEffect } from "react";
// import authService from "../../services/auth.service.js";

// //para mostrar los detalles de una orden después de que se haya realizado un pago exitoso.


// function Success() {
//   const [order, setOrder] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       try {
//         const queryParams = new URLSearchParams(window.location.search);
//         const id = queryParams.get("id");
//         console.log("aqui");
//         // Llama a la API para verificar el estado de pago en Stripe
//         await authService.api.get(
//           process.env.REACT_APP_SERVER_URL +`/api/stripe/checkPayment/${id}`
//         );

//         // Llama a la API para obtener los detalles de la orden 
//         const orderRes = await authService.api.get(
//           process.env.REACT_APP_SERVER_URL +`/api/orders/orders/${id}` 
//         );

//         setOrder(orderRes.data);
//         setLoading(false);
//       } catch (error) {
//         setError("Error al cargar los detalles de la orden.");
//         setLoading(false);
//       }
//     };

//     fetchOrderDetails();
//   }, []);

//   return (
//     <div>
//       {loading ? (
//         <p>Cargando...</p>
//       ) : error ? (
//         <p>{error}</p>
//       ) : (
//         <div>
//           <h2>Detalles de la orden</h2>
//           <p>Estado: {order.state}</p>
//           <p>ID de la orden: {order._id}</p>
//           <p>Productos:</p>
//           <ul>
//             {order.products.map((product) => (
//               <li key={product._id}>
//                 Nombre: {product.product.nombre}, Cantidad: {product.amount}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Success;


import React, { useState, useEffect } from "react";
import authService from "../../services/auth.service.js";
import "./Success.css"; // Importa tu archivo CSS aquí

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
        
        await authService.api.get(
          process.env.REACT_APP_SERVER_URL + `/api/stripe/checkPayment/${id}`
          process.env.REACT_APP_SERVER_URL + `/api/stripe/checkPayment/${id}`
        );

        // Llama a la API para obtener los detalles de la orden
        const orderRes = await authService.api.get(
          process.env.REACT_APP_SERVER_URL + `/api/orders/orders/${id}`
          process.env.REACT_APP_SERVER_URL + `/api/orders/orders/${id}`
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
    <div className="success-container">
    <div className="success-container">
      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="success-card">
        <div className="success-card">
          <h2>Detalles de la orden</h2>
          <p>Estado: {order.state}</p>
          <p>ID de la orden: {order._id}</p>
          <p>Productos:</p>
          <ul>
            {order.products.map((product) => (
              <li key={product._id}>
                Nombre: {product.product.nombre}, Cantidad: {product.amount}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Success;
