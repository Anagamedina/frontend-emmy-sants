import React, { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, Row, Col, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'; // Eliminamos el import innecesario
import axios from 'axios'; // Agregamos la importación de axios
import authService from '../../services/auth.service';
import { AuthContext } from '../../context/auth.context';
import "./productsPages.css"

function UserRamosDetailsPage() {
  const { id } = useParams();

  const [selectedProduct, setSelectedProduct] = useState({});


  useEffect(() => {
    const backendUrl = 'http://localhost:5005';
    authService.api
      .get(`${backendUrl}/api/products/${id}`)
      .then((response) => {
        setSelectedProduct(response.data); // Cambiamos setProduct por setSelectedProduct
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [id]);

  return (
    <Container className="contentProducts">
      <Row>
        <Col md={4}>
          <Card>
            <Card.Img
              variant="top"
              src={selectedProduct.imagen}
              alt={selectedProduct.nombre}
              style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
            />
          </Card>
        </Col>
        <Col md={8}>
        <Card>
  <Card.Body>
    <Card.Title style={{ fontSize: '3rem' }}>{selectedProduct.nombre}</Card.Title>
    <Card.Text style={{ fontSize: '1.2rem' }}>{selectedProduct.descripcion}</Card.Text>
    <Card.Text>Precio: {selectedProduct.precio}€</Card.Text>
    
    <Button className='btn btn-danger' variant="info">
       <Link to={`/flores`} >volver</Link>
    </Button>
  </Card.Body>
</Card>
</Col>

      </Row>
    </Container>
  );
}

export default UserRamosDetailsPage;