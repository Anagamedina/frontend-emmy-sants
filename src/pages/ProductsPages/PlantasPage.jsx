import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Modal, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Importa Link para la navegación
import "./productsPages.css"

function PlantasPage() {
  const [plantProducts, setPlantProducts] = useState([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [plantInfo, setPlantInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [plantInfoLoaded, setPlantInfoLoaded] = useState(false);

  const openDetailsModal = (product) => {
    setSelectedProduct(product);
    setShowDetailsModal(true);
  };

  const plantInfoInApi = (productName) => {
    const backendUrl = 'http://localhost:5005';

    const prompt = `Nombre científico de la planta ${productName}. Luego punto y Después sus características, clima donde habita, y hazme un listado de cuidados que debe tener, incluyendo cantidad de agua que debe darsele en determinado periodo de tiempo, si es de sol o sombra.`;

    setIsLoading(true);

    axios
      .get(`${backendUrl}/api/apiAi/info-planta`, {
        params: {
          prompt: prompt,
        },
      })
      .then((response) => {
        const info = response.data;
        setPlantInfo(info);
        setPlantInfoLoaded(true);
      })
      .catch((error) => {
        console.error('Error al obtener información de la planta:', error);
      })
      .finally(() => {
        setIsLoading(false);
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
    <div className="contentProducts">
      <h1>Plantas</h1>
      <Container>
        <Row>
          {plantProducts.map((product) => (
            <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
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
                    <Link to={`/product/${product._id}`}>Ver detalles</Link>
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
            <Row>
              <Col md={6}>
                <Card>
                  <Card.Img
                    variant="top"
                    src={selectedProduct.imagen}
                    alt={selectedProduct.nombre}
                    style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                  />
                </Card>
              </Col>
              <Col md={6}>
                <Card>
                  <Card.Body>
                    <Card.Title>{selectedProduct.nombre}</Card.Title>
                    <Card.Text>{selectedProduct.descripcion}</Card.Text>
                    <Card.Text>Precio: {selectedProduct.precio}</Card.Text>

                    <Button
                      variant="info"
                      onClick={() => plantInfoInApi(selectedProduct.nombre)}
                    >
                      Información Adicional
                    </Button>

                    {isLoading && (
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Spinner animation="border" />
                        <span style={{ marginLeft: '10px' }}>Cargando información de la API</span>
                      </div>
                    )}

                    {plantInfoLoaded && (
                      <div>
                        <p>{plantInfo.planta}</p>
                      </div>
                    )}

                    <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>
                      Cerrar
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default PlantasPage;
