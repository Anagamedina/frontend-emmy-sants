/* eslint-disable */
import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Confetti from "react-confetti"; // Importa Confetti desde la librería
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

        setTimeout(() => {
          setShowConfetti(false); 
        }, 11000); 
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
        {showConfetti && <Confetti />} {/* Mostrar confeti cuando showConfetti es true */}
        {loading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div>
            <h2 className="text-center">¡Su transacción ha sido exitosa!</h2>
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
                        Precio Unitario: ${productsInfo[index].precio}
                        <br />
                        Total del Producto: ${calculateProductTotal(product, productsInfo[index])}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
            <br/>
            <h3 className="text-center">Precio Total de la Orden: ${calculateTotalPrice(order.products, productsInfo)}</h3>
          </div>
        )}
      </Container>
    </div>
  );
}

export default Success;
