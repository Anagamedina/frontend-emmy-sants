//ANA

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

//chat
// import React, { useState, useEffect } from "react";
// import authService from "../../services/auth.service.js";
// import "./Success.css"; 

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
        
//         await authService.api.get(
//           process.env.REACT_APP_SERVER_URL + `/api/stripe/checkPayment/${id}`
//         );

        
//         const orderRes = await authService.api.get(
//           process.env.REACT_APP_SERVER_URL + `/api/orders/orders/${id}`
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
//     <div className="success-container">
//       {loading ? (
//         <p>Cargando...</p>
//       ) : error ? (
//         <p>{error}</p>
//       ) : (
//         <div className="success-card">
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
import authService from "../../services/auth.service";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Confetti from "react-confetti"; // Import Confetti from the library
import "./Success.css";

function Success() {
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productsInfo, setProductsInfo] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get("id");
        
        // Missing await here, and the URL is not assigned to anything
        const checkPaymentResponse = await fetch(
          process.env.REACT_APP_SERVER_URL + `/api/stripe/checkPayment/${id}`
        );

        if (!checkPaymentResponse.ok) {
          throw new Error("Error al verificar el estado de pago en Stripe");
        }

        const orderRes = await fetch(
          process.env.REACT_APP_SERVER_URL + `/api/orders/orders/${id}`
        );

        if (!orderRes.ok) {
          throw new Error("Error al obtener los detalles de la orden");
        }

        const orderData = await orderRes.json();
        const products = orderData.products;
        const productInfoPromises = products.map(async (product) => {
          const productRes = await fetch(
            process.env.REACT_APP_SERVER_URL + `/api/products/${product.product}`
          );

          if (!productRes.ok) {
            throw new Error("Error al obtener la información del producto");
          }
          return productRes.json();
        });

        const productsInfo = await Promise.all(productInfoPromises);
        setProductsInfo(productsInfo);

        setOrder(orderData);
        setLoading(false);
        setShowConfetti(true);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, []);

  const calculateProductTotal = (product, productInfo) => {
    return product.amount * productInfo.precio;
  };

  const calculateTotalPrice = (products, productsInfo) => {
    return products.reduce((total, product, index) => total + calculateProductTotal(product, productsInfo[index]), 0);
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <Container>
        {showConfetti && <Confetti />} 
        {loading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div>
            <h2 className="text-center">Su transacción ha sido exitosa</h2>
            <h4 className="text-center">Detalles de la orden</h4>
            <p className="text-center">Estado: {order.state}</p>
            <p className="text-center">ID de la orden: {order._id}</p>
            <Row className="justify-content-center">
              {order.products.map((product, index) => (
                <Col key={product.product._id} xs={12} sm={6} md={4} lg={3}>
                  <Card className="text-center">
                    <Card.Img
                      variant="top"
                      src={productsInfo[index].imagen}
                      alt={productsInfo[index].nombre}
                      className="img-fluid imgOrderSuccess"
                      style={{ maxWidth: "55%", margin: "0 auto" }}
                    />
                    <Card.Body>
                      <Card.Title>{productsInfo[index].nombre}</Card.Title>
                      <Card.Text>
                        Cantidad: {product.amount}
                        <br />
                        Precio Unitario: {productsInfo[index].precio}€
                        <br />
                        Total del Producto: {calculateProductTotal(product, productsInfo[index])}€
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
            <br />
            <h3 className="text-center">Precio Total de la Orden: ${calculateTotalPrice(order.products, productsInfo)}</h3>
          </div>
        )}
      </Container>
    </div>
  );
}

export default Success;
