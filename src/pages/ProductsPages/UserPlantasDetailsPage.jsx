import React, { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, Row, Col, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'; // Eliminamos el import innecesario
import axios from 'axios'; // Agregamos la importación de axios
import authService from '../../services/auth.service';
import { AuthContext } from '../../context/auth.context';
import "./productsPages.css"
import plantas from "../../img/plantas.png"


function UserPlantasDetailsPage() {
  const { id } = useParams();

  const [selectedProduct, setSelectedProduct] = useState({});
  const [plantInfo, setPlantInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [plantInfoLoaded, setPlantInfoLoaded] = useState(false);
  const [isAddedToCardVal, setIsAddedToCardVal] = useState({});

    
  // {
  //   "products": [
  //     {
  //       "product": "6510977c639e3b694084ddc4",
  //       "amount": 7
  //     },
  //     {
  //       "product": "65109609ea5efa2ff1a74838",
  //       "amount": 4
  //    }
  //   ],
  //   "usuario": "65204b50aa655f842b1abad0"
  //  }

  
//Esta función verifica si el producto actual ya está en el carrito.
  const addToCart=(prod)=>{
    let carrito = [] 

    let cardLS = localStorage.getItem("cart")
    if(cardLS != null){
      carrito = JSON.parse(cardLS)
    } 

  //   const existingProduct = carrito.find((p) => p._id === prod._id);

  //   if (existingProduct) {
  //     // Si el producto ya está en el carrito, lo eliminamos
  //     carrito = carrito.filter((p) => p._id !== prod._id);
  //   } else {
  //     // Si el producto no está en el carrito, lo agregamos
  //     carrito.push(prod);
  //   }
  
  //   localStorage.setItem("cart", JSON.stringify(carrito));
  //   isAddedToCart(); // Actualiza el estado del botón
  // };

    if(carrito.length === 0  || carrito.find(p=>p._id !== prod._id))  {
      carrito.push(prod) 
    } 
    
    localStorage.setItem("cart", JSON.stringify(carrito))
    isAddedToCard()
  }



  ///verifique si el producto actual está en el carrito:
  const isAddedToCard=(prod)=>{
    let carrito = [] 

    let cardLS = localStorage.getItem("cart")
    if(cardLS != null){
      carrito = JSON.parse(cardLS)
    } 
    setIsAddedToCardVal(carrito.find(p=>p._id === id))  //setIsAddedToCardVal(carrito.some((p) => p._id === id));
  }

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
    isAddedToCard()
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
    <Button className='btn btn-success m-2 text-light' disabled={isAddedToCardVal}  onClick={()=>addToCart(selectedProduct)} variant="info">
        Añadir al carrito
    </Button>
  </Card.Body>
</Card>


  <Card className='botonInfoAdicionalCard'>
    <Card.Body>
    <div>
      <img src={plantas} alt="Cuidados Plantas" />
    </div>
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
          <span style={{ marginLeft: '10px' }}>Descargando la información 📦</span>
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

export default UserPlantasDetailsPage;
