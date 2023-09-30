import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';

function PlantasPage() {
  const [plantProducts, setPlantProducts] = useState([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [productInfo, setProductInfo] = useState({});
  const [plantInfo, setPlantInfo] = useState({});
  const [plantInfoLoaded, setPlantInfoLoaded] = useState(false); // Agregar estado para plantInfoLoaded

  const openDetailsModal = (product) => {
    setSelectedProduct(product);
    setShowDetailsModal(true);
  };

  const fetchProductInfo = (productName) => {
    const backendUrl = 'http://localhost:5005';

    axios
      .get(`${backendUrl}/api/product-info/${productName}`)
      .then((response) => {
        const info = response.data;
        setProductInfo(info);
      })
      .catch((error) => {
        console.error('Error al obtener información del producto:', error);
      });
  };

  const fetchPlantInfo = (productName) => {
    const backendUrl = 'http://localhost:5005';

    axios
      .get(`${backendUrl}/api/apiAi`, {
        params: {
          productName: productName,
        },
      })
      .then((response) => {
        const info = response.data;
        setPlantInfo(info);
        setPlantInfoLoaded(true); // Establecer que la información se ha cargado
      })
      .catch((error) => {
        console.error('Error al obtener información de la planta:', error);
      });
  };

  useEffect(() => {
    const axiosProducts = () => {
      const backendUrl = 'http://localhost:5005';

      axios
        .get(`${backendUrl}/api/products`)
        .then((response) => {
          const allProducts = response.data;
          const plantProducts = getPlantProducts(allProducts);
          setPlantProducts(plantProducts);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };

    axiosProducts();
  }, []);

  function getPlantProducts(products) {
    return products.filter((product) => product.categoria === 'plantas');
  }

  return (
    <div className="contentPlantas">
      <h1>PlantasPage</h1>
      <Container>
        <Row>
          {plantProducts.map((product) => (
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
                  <Card.Text>Categoría: {product.categoria}</Card.Text>
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
                <Card.Text>Categoría: {selectedProduct.categoria}</Card.Text>

                <Button
                  variant="info"
                  onClick={() => fetchPlantInfo(selectedProduct.nombre)}
                >
                  Información Adicional
                </Button>

                {/* Mostrar la información adicional de la planta debajo del enlace */}
                {plantInfoLoaded && (
                  <div>
                    <p>{plantInfo.descripcionAdicional}</p>
                    <p>{plantInfo.otraInformacion}</p>
                  </div>
                )}

                {/* Agregar un botón para cerrar el modal */}
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

export default PlantasPage;
