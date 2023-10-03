import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./productsPages.css"

function PlantasPage() {
  const [plantProducts, setPlantProducts] = useState([]);

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
                  <Button variant="info">
                    <Link to={`/product/plantas/${product._id}`} className='botonVerDetalles'>Ver detalles</Link>
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default PlantasPage;
