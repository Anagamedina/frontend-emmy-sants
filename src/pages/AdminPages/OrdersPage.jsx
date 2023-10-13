// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import authService from '../../services/auth.service.js';
// import './OrdersPage.css'; // Importa tu archivo CSS

// function OrdersPage() {
//   const [orders, setOrders] = useState([]);

//   const axiosOrders = () => {
//     const backendUrl = 'http://localhost:5005';
//     authService.api
//       .get(`${backendUrl}/api/orders`)
//       .then((response) => {
//         console.log(response);
//         setOrders(response.data);
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
//   };

//   useEffect(() => {
//     axiosOrders();
//   }, []);

//   return (
//     <Container>
//       {orders.map((order, i) => (
//         <Row key={i}>
//           <Col>
//             <Card style={{ width: '18rem' }}>
//               <Card.Img
//                 variant="top"
//                 src={order.products[0].product.imagen} // Asumiendo que hay al menos un producto en cada orden
//                 alt={order.products[0].product.nombre}
//               />
//               <Card.Body>
//                 <Card.Title>Order {i + 1}</Card.Title>
//                 <Card.Text>
//                   Date: {order.createdAt}
//                   <br />
//                   Total: ${order.totalAmount}
//                 </Card.Text>
//               </Card.Body>
//             </Card>
//           </Col>
//           <Col>
//             {order.products.map((producto, y) => (
//               <Card key={y}>
//                 <Card.Img
//                   variant="top"
//                   src={producto.product.imagen}
//                   alt={producto.product.nombre}
//                 />
//                 <Card.Body>
//                   <Card.Title>{producto.product.nombre}</Card.Title>
//                   <Card.Text>
//                     Amount: {producto.amount}
//                     <br />
//                     Price: ${producto.product.precio * producto.amount}
//                   </Card.Text>
//                 </Card.Body>
//               </Card>
//             ))}
//           </Col>
//         </Row>
//       ))}
//     </Container>
//   );
// }

// export default OrdersPage;





import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import authService from '../../services/auth.service.js'; // Asegúrate de importar authService correctamente
// import { Container, Row, Col, Card } from 'react-bootstrap';
// import './OrderPage.css';
function OrdersPage() {
   
  // const [orders, setOrders] = useState([]); 
  const [orders, setOrders] = useState([]);
  // const [totalOrders, setTotalOrders] = useState(0);


  // function calculateTotalPrice(products) {
  //     return products.reduce((total, productInfo) => {
  //       return total + (productInfo.product ? productInfo.product.precio : 0);
  //     }, 0);
  //   }
  
  const axiosOrders = () => {
    const backendUrl = 'http://localhost:5005'; 
    authService.api
      .get(`${backendUrl}/api/orders`)
      .then((response) => {
        console.log(response);
        setOrders(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
   
  useEffect(() => {
    axiosOrders();
  }, []);

  return (
    <div>
    <br/>
    <br/>
    <br/>
    <br/>
    <div className="message-container"> 
       
      </div>
{orders.length}
      <Container> 

     

        {orders.map((order,i) => {
            return (
                <div class="card" style={{width: "18rem"}}>

                    <p>fecha:  {order.createdAt}</p> 
                    <ul class="list-group list-group-flush"> 

                    <div class="list-group-item" key={i}>
                    {order.products.filter(p=>p.product!=null).map( (producto,y) =>{
                       
                        return (
                          <div> 
                            <li class="list-group-item"  key={y}>   {producto.amount} x {producto.product.nombre}  = {producto.product.precio*producto.amount}€</li> 
                          </div>
                        )

                    } )}

                     </div>
                     </ul>
                   </div>

                
            )
        })} 
      </Container>
    </div>
  );
}

export default OrdersPage;




// return (
//   <Container>
//   <br />
//   <br />
//   <h2>Número de Pedidos: {totalOrders}</h2>
//   <Row>
//     {orders.map((order, i) => (
//       <Col key={i} xs={12} lg={3}>
//         <Card style={{ width: '100%' }}>
//           <Card.Body className='cardBodyOrder'>
//             <Card.Title>Order ID: {order._id ? order._id : "ID no disponible"}</Card.Title>
//             <Card.Text>
//               Estado: {order.state ? order.state : "Estado no disponible"}
//               <br />
//               Fecha de Creación: {order.createdAt ? new Date(order.createdAt).toLocaleString() : "Fecha no disponible"}
//               <br />
//               Comprador: {order.usuario ? `${order.usuario.firstName} ${order.usuario.lastName}` : "Usuario no disponible"}
//               <br />
//               Monto total de la compra: {calculateTotalPrice(order.products)}€
//             </Card.Text>
//             <ul className="list-group list-group-flush">
//               {order.products.map((productInfo, y) => (
//                 <li className="list-group-item" key={y}>
//                   Producto ID: {productInfo.product ? productInfo.product._id : "ID no disponible"}
//                   <br />
//                   Nombre del Producto: {productInfo.product ? productInfo.product.nombre : "Nombre no disponible"}
//                   <br />
//                   Precio del Producto: {productInfo.product ? productInfo.product.precio : "Nombre no disponible"}€
//                   <br />
//                   <img
//                     src={productInfo.product ? productInfo.product.imagen : ""}
//                     alt={productInfo.product ? productInfo.product.nombre : "Imagen no disponible"}
//                     className="img-fluid"
//                   />
//                 </li>
//               ))}
//             </ul>
//           </Card.Body>
//         </Card>
//       </Col>
//     ))}
//   </Row>
// </Container>
// );
// }
// export default OrdersPage;
