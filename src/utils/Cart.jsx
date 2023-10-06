

import { useId } from 'react'
import { useCart } from '../hooks/useCart.js'
import { Container, Card, Button } from 'react-bootstrap';
import { CartIcon, ClearCartIcon } from './Icons.jsx'

import "./Cart.css"
function CartItem ({ imagen, precio, nombre, quantity, addToCart }) {
    return (
      <li>
        <img
          src={imagen}
          alt={nombre}
        />
        <div>
          <strong>{nombre}</strong> - ${precio}
        </div>
  
        <footer>
          <small>
            Qty: {quantity}
          </small>
          <button onClick={addToCart}>+</button>
        </footer>
      </li>
    )
  }
  
export function Cart () {
    const cartCheckboxId = useId()
    const { cart, clearCart, addToCart } = useCart()
//   let cart =[{nombre:"test"}]
    return (
      <>
      
      <label className='cart-button' htmlFor={cartCheckboxId}>
      <CartIcon />

      </label>
        <input id={cartCheckboxId} type='checkbox' hidden />
        <aside className='cart'>

          <ul>
            {cart.map(product => ( 
              <CartItem 
                key={product.nombre}
                addToCart={() => addToCart(product)}
                {...product}
              />
            ))}
          </ul>
          
     
          <Button onClick={clearCart}>
          <ClearCartIcon />
          </Button>
          
            </aside>
      </>
    )
  }
  