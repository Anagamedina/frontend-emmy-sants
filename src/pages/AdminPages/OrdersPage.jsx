import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './OrderPage.css';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);

  const axiosOrders = () => {
    const backendUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:5005'; // Asegúrate de que esta URL sea correcta
    axios
      .get(`${backendUrl}/api/orders`)
      .then((response) => {
        console.log(response);
        setOrders(response.data);
        setTotalOrders(response.data.length);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    axiosOrders();
  }, []);

  return (
    <Container>
      <br />
      <br />
      <h2 className='titleOrders' >Número de Pedidos: {totalOrders}</h2>
      <Row>
        {orders.map((order, i) => (
          <Col key={i} xs={12} lg={3}>
            <Card style={{ width: '100%' }}>
              <Card.Body className='cardBodyOrder'>
                <Card.Title>
                <h4>Comprador:<br /> {order.usuario ? `${order.usuario.firstName} ${order.usuario.lastName}` : "Usuario no disponible"}</h4>
                  <hr></hr>
                  <h6>Número de Orden: {order._id ? order._id : "ID no disponible"}</h6>
                </Card.Title>
                <Card.Text>
                <hr></hr>
                  Estado: {order.state ? order.state : "Estado no disponible"}
                  <hr></hr>
                  Fecha de Creación: <br />{order.createdAt ? new Date(order.createdAt).toLocaleString() : "Fecha no disponible"}
                  <hr></hr>
                  StrapiID: <p className='strapiFont' >{order.strapiID ? order.strapiID : "Nombre no disponible"}</p>
                  <hr></hr>
                  Total Compra: {calculateTotalPrice(order.products)}€
                </Card.Text>
                <ul className="list-group list-group-flush">
                  {order.products.map((productInfo, y) => (
                    <li className="list-group-item" key={y}>
                      Producto: {productInfo.product ? productInfo.product.nombre : "Nombre no disponible"}
                      <br />
                      Cantidad: {productInfo.amount ? productInfo.amount : "Cantidad no disponible"}
                      <br />
                      Precio del Producto: {productInfo.product ? productInfo.product.precio : "Nombre no disponible"}€
                      <br />
                      Precio Total: {productInfo.product && productInfo.amount
                        ? `${productInfo.product.precio * productInfo.amount}€`
                        : "Precio total no disponible"}
                      <br />
                      <img
                        src={productInfo.product ? productInfo.product.imagen : ""}
                        alt={productInfo.product ? productInfo.product.nombre : "Imagen no disponible"}
                        className="img-fluid"
                      />
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}


function calculateTotalPrice(products) {
  return products.reduce((total, productInfo) => {
    // return total + (productInfo.product ? productInfo.product.precio : 0);
    return total + (productInfo.product ? productInfo.product.precio * productInfo.amount : 0);
  }, 0);
}

export default OrdersPage;



