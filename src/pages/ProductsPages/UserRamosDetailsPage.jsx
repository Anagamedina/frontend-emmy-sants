import React, { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import authService from '../../services/auth.service';
import { AuthContext } from '../../context/auth.context';
import './productsPages.css';

function UserRamosDetailsPage() {
  const { id } = useParams();

  const { setCartVisibility } = useContext(AuthContext);

  const [selectedProduct, setSelectedProduct] = useState({});
  const [isAddedToCardVal, setIsAddedToCardVal] = useState(false);

  const addToCart = (prod) => {
    // Resto del código para agregar al carrito
  };

  const checkStock = () => {
    const backendUrl = 'http://localhost:5005';
    axios
      .get(`${backendUrl}/api/products/${id}/storage`)
      .then((response) => {
        const stockAmount = response.data.amount;
        if (stockAmount <= 0) {
          setIsAddedToCardVal(true);
        } else {
          setIsAddedToCardVal(false);
        }
      })
      .catch((error) => {
        console.error('Error al obtener información de stock:', error);
      });
  };

  useEffect(() => {
    checkStock();
    const backendUrl = 'http://localhost:5005';
    authService.api
      .get(`${backendUrl}/api/products/${id}`)
      .then((response) => {
        setSelectedProduct(response.data);
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
                <Link to={`/flores`}>volver</Link>
              </Button>
              <Button
                className='btn btn-success m-2 text-light'
                disabled={isAddedToCardVal}
                onClick={() => addToCart(selectedProduct)}
                variant="info"
              >
                Añadir al carrito
              </Button>
              {isAddedToCardVal && (
                <span style={{ color: 'red' }}>Sin Stock</span>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default UserRamosDetailsPage;