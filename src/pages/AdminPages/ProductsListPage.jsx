import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import authService from '../../services/auth.service.js';

function StoragePage() {
  const [storageData, setStorageData] = useState([]);

  const axiosStorageData = () => {
    const backendUrl = 'http://localhost:5005';

    authService.api
      .get(`${backendUrl}/api/products/storage`)
      .then((response) => {
        setStorageData(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    axiosStorageData();
  }, []);

  return (
    <div className="contentStorage">
      <Container>
        <h2>Lista de Almacenamiento</h2>
        <Row>
          {storageData.map((storageItem) => (
            <Col key={storageItem._id} xs={12} sm={4} md={4} lg={4}>
              <Card>
                <Card.Body>
                  <Card.Title>Producto: {storageItem.product.nombre}</Card.Title>
                  <Card.Text>Cantidad en Almacenamiento: {storageItem.amount}</Card.Text>
                  <Card.Text>Fecha de Creación: {new Date(storageItem.createdAt).toLocaleDateString()}</Card.Text>
                  <Card.Text>Última Actualización: {new Date(storageItem.updatedAt).toLocaleDateString()}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default StoragePage;
