import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./productsPages.css"

function RamosPage() {
  const [plantProducts, setPlantProducts] = useState([]);
  const [stockInfo, setStockInfo] = useState({});

  useEffect(() => {
    const axiosProducts = () => {
      const backendUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:5005';

      axios
        .get(`${backendUrl}/api/products`)
        .then((response) => {
          response.data.map(prod =>  
            prod.imagen = prod.imagen.replace("/upload","/upload/w_250")
           )
          const allProducts = response.data;
          const plantProducts = getPlantProducts(allProducts);
          setPlantProducts(plantProducts);

          const productIds = plantProducts.map((product) => product._id);
          axios
            .all(productIds.map((productId) =>
              axios.get(`${backendUrl}/api/products/${productId}/storage`)
            ))
            .then((stockResponses) => {
              const stockData = {};
              stockResponses.forEach((response, index) => {
                stockData[productIds[index]] = response.data.amount;
              });
              setStockInfo(stockData);
            });
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };

    axiosProducts();
  }, []);

  function getPlantProducts(products) {
    return products.filter((product) => product.categoria === 'ramos');
  }

  return (
    <div className="contentProducts">
      <h1>Ramos</h1>
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
                  <Card.Text className='cardText'>{product.descripcion.slice(0, 52)}...</Card.Text>
                  <Card.Text>Precio: {product.precio}€</Card.Text>
                  
                  {/* Título h4 con fondo de color rojo o verde para indicar el estado de stock */}
                  <div className='m-2'>

                  <h6
                    className={`text-lightx btn btn-outline-${stockInfo[product._id] > 0 ? 'success' : 'secondary'} d-inline p-1 m-2 bgx-${stockInfo[product._id] > 0 ? 'success' : 'secondary'}`}
                    >
                    {stockInfo[product._id] > 0 ? 'En Stock' : 'Sin Stock'}
                  </h6>
                    </div>

                  {/* Botón "Ver detalles" que lleva a la página de detalles del producto */}
                  <Link to={`/product/ramos/${product._id}`} className='botonVerDetalles'>
                    <Button className='text-light' variant="info">Ver detalles</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default RamosPage;
