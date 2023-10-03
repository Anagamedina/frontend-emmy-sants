import React, { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, Row, Col, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'; // Eliminamos el import innecesario
import axios from 'axios'; // Agregamos la importación de axios
import authService from '../../services/auth.service';
import { AuthContext } from '../../context/auth.context';
import "./productsPages.css"

function UserProductDetailsPage() {
  const { id } = useParams();

  const [selectedProduct, setSelectedProduct] = useState({});
  const [plantInfo, setPlantInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [plantInfoLoaded, setPlantInfoLoaded] = useState(false);


  const plantInfoInApi = (productName) => {
    const backendUrl = 'http://localhost:5005';

    const prompt = `Dame sobre la siguiente planta: ${selectedProduct.nombre}. Dame la siguiente información: Nombre común. Punto. Nombre cientifico. Características, listado de cuidados que debe tener, cantidad de agua que debe darsele en determinado periodo de tiempo, si es de sol o sombra.`;

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
       <Link to={`/plantas`} >volver</Link>
    </Button>
  </Card.Body>
</Card>


  <Card className='botonInfoAdicionalCard'>
    <Card.Body>
      <Button
        className='botonInfoAdicional'
        style={{ color: 'white' }}
        variant="info"
        onClick={() => plantInfoInApi(selectedProduct.nombre)}
      >
        Información Adicional
      </Button>

      {isLoading && (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Spinner animation="border" />
          <span style={{ marginLeft: '10px' }}>Cargando información de la API 📦</span>
        </div>
      )}

      {plantInfoLoaded && (
        <div className='plantaInfo'>
          <p>{plantInfo.planta}</p>
        </div>
      )}
    </Card.Body>
  </Card>
</Col>

      </Row>
    </Container>
  );
}

export default UserProductDetailsPage;
