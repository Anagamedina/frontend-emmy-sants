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
    {/* Mapear a través de la lista de pedidos */}
    {orders.map((order) => (
      <Col key={order._id} sm={12} md={4} lg={3} xl={3} className="mb-3">
        <Card className="card h-100 bg-white rounded">
          <Card.Header className='cardHeader' >
            {/* Mostrar la fecha del pedido */}
          </Card.Header>
          <Card.Body className='cardBody' >
            <Card.Title className='cardTitle' >Pedido</Card.Title>
            <ul>
              {/* Mapear a través de los productos en el pedido */}
              {order.products.map((productInfo, index) => (
                <li key={index}>
                  <div className="product-info">
                    {/* Mostrar información del producto */}
                  </div>
                </li>
              ))}
            </ul>
          </Card.Body>
          <Card.Footer className='cardFooter' >
            {/* Mostrar el total del pedido y el estado del pedido */}
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


