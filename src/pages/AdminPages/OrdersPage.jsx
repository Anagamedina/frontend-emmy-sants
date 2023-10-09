import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import authService from '../../services/auth.service.js'; // Asegúrate de importar authService correctamente

function OrdersPage() {
   
  const [orders, setOrders] = useState([]); 

  
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
