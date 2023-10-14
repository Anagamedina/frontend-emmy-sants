import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';

function StoragePage() {
  const [storageItems, setStorageItems] = useState([]);
  const [token, setToken] = useState('');

  const axiosStorage = () => {
    const backendUrl = 'http://localhost:5005';

    // Realiza una solicitud para obtener la información de almacenamiento
    axios
      .get(`${backendUrl}/api/products/storage`, {
        headers: {
          Authorization: `Bearer ${token}`, // Usa el token almacenado en el estado
        },
      })
      .then((response) => {
        setStorageItems(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    // Obtén el token del almacenamiento local al cargar el componente
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
    }

    axiosStorage();
  }, []);

  return (
    <div className="contentStorage">
      <Container>
        <h2>Almacenamiento de Productos</h2>
        <Row>
          {storageItems.map((storageItem) => (
            <Col key={storageItem._id} xs={12} sm={6} md={4} lg={3}>
              <Card>
                {/* Aquí puedes mostrar la información del producto asociado */}
                <Card.Img
                  variant="top"
                  src={storageItem.product.imagen}
                  alt={storageItem.product.nombre}
                  style={{ maxWidth: '100%', height: 'auto', objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title>{storageItem.product.nombre}</Card.Title>
                  <Card.Text>Cantidad en Almacenamiento: {storageItem.amount}</Card.Text>
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
