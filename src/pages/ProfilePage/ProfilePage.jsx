import React, { useState, useEffect } from 'react';
import authService from "../../services/auth.service";
import { Link } from "react-router-dom"; // Agrega el import para el componente Link
import './ProfilePage.css';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ProfilePage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrderHistory() {
      try {
        const response = await authService.api.get("/api/orders/history");

        response.data.forEach(order => {
          let totalAmount = 0;
          order.products.forEach(productInfo => {
            totalAmount += productInfo.amount * (productInfo.product ? productInfo.product.precio : 0);
          });
          order.totalAmount = totalAmount;
        });

        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching order history:", error);
        setLoading(false);
      }
    }

    fetchOrderHistory();
  }, []);

  return (
    <div className="profile-page">
      <h1>Profile Page</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <Row className="justify-content-center">
          {orders.map((order) => (
            <Col key={order._id} sm={12} md={4} lg={3} xl={3} className="mb-3">
              <Card className="card h-100 bg-white rounded">
                <Card.Header className='cardHeader' >
                  <strong>Fecha del Pedido:<br/></strong> {order.createdAt ? new Date(order.createdAt).toLocaleString() : 'N/A'}
                </Card.Header>
                <Card.Body className='cardBody' >
                  <Card.Title className='cardTitle' >Pedido</Card.Title>
                  <ul>
                    {order.products.map((productInfo, index) => (
                      <li key={index}>
                        <div className="product-info">
                          {productInfo.product && (
                            <Link to={`/product/plantas/${productInfo.product._id}`}> {/* Agregar Link a la página de detalles del producto */}
                              <img
                                className="product-image"
                                src={productInfo.product.imagen}
                                alt={productInfo.product.nombre}
                              />
                            </Link>
                          )}
                          <div className="product-name">
                            {productInfo.amount} x{' '}
                            {productInfo.product && (
                              <Link to={`/product/plantas/${productInfo.product._id}`}>
                                <span style={{ textDecoration: 'none', color: '#4abcf1' }}>{productInfo.product.nombre}</span>
                              </Link>
                            ) || 'N/A'} 
                          </div>
                          <div className="product-price">
                            Precio por unidad: {productInfo.product && productInfo.product.precio || 0}€
                          </div>
                          <div className="product-total">
                            Total: {productInfo.amount * (productInfo.product && productInfo.product.precio || 0)}€
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Card.Body>
                <Card.Footer className='cardFooter' >
                  <strong>Total Pedido:</strong> {order.totalAmount || 0}€
                  <br />
                  <strong>Estado del Pedido:</strong> {order.state || 'N/A'}
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default ProfilePage;


// import React, { useState, useEffect } from 'react';
// import authService from "../../services/auth.service";
// import './ProfilePage.css';

// function ProfilePage() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchOrderHistory() {
//       try {
//         const response = await authService.api.get("/api/orders/history");

//         setOrders(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching order history:", error);
//         setLoading(false);
//       }
//     }

//     fetchOrderHistory();
//   }, []);

//   return (
//     <div className="profile-page">
//       <h1>Profile Page</h1>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div className="order-list">
//           {orders.map((order) => (
//             <div className="order-card" key={order._id}>
//               <div className="order-details">
//                 <h3>Order Details</h3>
//                 <ul>
//                   {order.products.map((productInfo, index) => (
//                     <li key={index}>
//                       <div className="product-info">
//                         {productInfo.product && (
//                           <img
//                             className="product-image"
//                             src={productInfo.product.imagen}
//                             alt={productInfo.product.nombre}
//                           />
//                         )}
//                         <div className="product-name">
//                           {productInfo.amount} x {productInfo.product && productInfo.product.nombre || 'N/A'} (${(productInfo.amount * (productInfo.product && productInfo.product.precio || 0))})
//                         </div>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//               <div className="order-total">
//                 <strong>Total:</strong> ${calculateTotalPrice(order.products) || 0}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// // Función para calcular el monto total de la compra
// function calculateTotalPrice(products) {
//   return products.reduce((total, productInfo) => {
//     return total + (productInfo.product ? productInfo.product.precio : 0);
//   }, 0);
// }

// export default ProfilePage;
