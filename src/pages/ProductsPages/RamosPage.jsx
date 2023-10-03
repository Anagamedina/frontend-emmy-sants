import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import "./productsPages.css"

function RamosPage() {
  const [ramosProducts, setRamosProducts] = useState([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});

  const openDetailsModal = (product) => {
    setSelectedProduct(product);
    setShowDetailsModal(true);
  };

  
  useEffect(() => {
    const axiosProducts = () => {
      const backendUrl = 'http://localhost:5005';

      axios
        .get(`${backendUrl}/api/products`)
        .then((response) => {
          const allProducts = response.data;
          const ramosProducts = getRamosProducts(allProducts);
          setRamosProducts(ramosProducts);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };

    axiosProducts();
  }, []);

  function getRamosProducts(products) {
    return products.filter((product) => product.categoria === 'ramos');
  }

  return (
    <div  className="contentProducts">
      <h1>Flores</h1>
      <Container>
        <Row>
          {ramosProducts.map((product) => (
            <Col key={product._id} xs={12} sm={4} md={3} lg={3}>
              <Card>
                <Card.Img
                  variant="top"
                  src={product.imagen}
                  alt={product.nombre}
                  className="product-image"
                />
                <Card.Body className="card">
                  <Card.Title>
                    <h4>{product.nombre}</h4>
                  </Card.Title>
                  <Card.Text className="cardText">{product.descripcion}</Card.Text>
                  <Card.Text>Precio: {product.precio}</Card.Text>
                  <Button
                    variant="info"
                    onClick={() => openDetailsModal(product)}
                  >
                    Ver detalles
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles del Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Card>
              <Card.Img
                variant="top"
                src={selectedProduct.imagen}
                alt={selectedProduct.nombre}
                style={{ width: '400px', height: '400px', objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title>{selectedProduct.nombre}</Card.Title>
                <Card.Text>{selectedProduct.descripcion}</Card.Text>
                <Card.Text>Precio: {selectedProduct.precio}</Card.Text>

                <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>
                  Cerrar
                </Button>
              </Card.Body>
            </Card>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default RamosPage;
