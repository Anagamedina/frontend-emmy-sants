import React, { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate desde react-router-dom
import { AuthContext } from '../../context/auth.context'; // Asegúrate de importar AuthContext correctamente

function ShoppingCartPage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  // Obtén el contexto de autenticación
  const authContext = useContext(AuthContext);
  
  // Utiliza useNavigate para obtener la función de navegación
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si el usuario está autenticado
    if (!authContext.isLoggedIn) {
      // El usuario no está autenticado, puedes redirigirlo a la página de inicio de sesión
      // utilizando la función navigate
      navigate('/login');
    }

    // Obtener la lista de productos al cargar la página
    axios.get('http://localhost:5005/api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.log(`Error while fetching products: ${error}`);
      });
  }, [authContext.isLoggedIn, navigate]);

  useEffect(() => {
    // Calcular el total cada vez que cambie el carrito
    const newTotal = cart.reduce((acc, product) => acc + product.precio, 0);
    setTotal(newTotal);
  }, [cart]);

  const addToCart = (product) => {
    axios.post('http://localhost:5005/api/shopping-cart/add', {
      productId: product._id,
    })
    .then(response => {
      setCart([...cart, response.data]);
    })
    .catch(error => {
      console.log(`Error while adding product to cart: ${error}`);
    });
  };

  const removeFromCart = (cartItem) => {
    axios.delete(`http://localhost:5005/api/shopping-cart/remove/${cartItem._id}`)
      .then(() => {
        const updatedCart = cart.filter(item => item._id !== cartItem._id);
        setCart(updatedCart);
      })
      .catch(error => {
        console.log(`Error while removing product from cart: ${error}`);
      });
  };

  return (
    <Container>
      <h1 className="mt-3">Carrito de Compras</h1>
      <Row>
        <Col md={6}>
          <h2 className="mt-3">Productos Disponibles</h2>
          <ListGroup>
            {products.map(product => (
              <ListGroup.Item key={product._id}>
                {product.nombre} - ${product.precio}
                <Button
                  variant="success"
                  className="float-end"
                  onClick={() => addToCart(product)}
                >
                  Agregar al carrito
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={6}>
          <h2 className="mt-3">Carrito de Compras</h2>
          {cart.length === 0 ? (
            <p>El carrito está vacío.</p>
          ) : (
            <ListGroup>
              {cart.map(cartItem => (
                <ListGroup.Item key={cartItem._id}>
                  {cartItem.product.nombre} - ${cartItem.product.precio}
                  <Button
                    variant="danger"
                    className="float-end"
                    onClick={() => removeFromCart(cartItem)}
                  >
                    Eliminar del carrito
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
          <p className="mt-3">Total: ${total}</p>
        </Col>
      </Row>
    </Container>
  );
}

export default ShoppingCartPage;
