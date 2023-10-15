/*eslint-disable*/
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from "../../img/logoemmy.png";
import { FaBars } from 'react-icons/fa';
import "./Navbar.css";
import Cart from "../../pages/OrderPage/Cart.jsx"

function CustomNavbar() {
  const { isLoggedIn, user, logOutUser, setCartVisibility, showCart, cartCounter, setCartCounter } = useContext(AuthContext);
  const [expanded, setExpanded] = useState(false);
  // const [toggleCarti, setToggleCarti] = useState(false);

  const toggleCart = () => {
    setCartVisibility(!showCart)
  }

  return (
    <div className="content">
      <Navbar bg="rgb(206, 139, 189)" expand="lg" expanded={expanded} className={`nav ${expanded ? 'expanded' : ''}`}>
        <Navbar.Brand className="logo">
          <img src={logo} alt="Logo Emmy Sants" />
        </Navbar.Brand>
        <Navbar.Toggle
          className="navToggle"
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(!expanded)}
          style={{ color: 'white' }}
        >
          <FaBars />
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto linksNav">
            <Link to="/" className="nav-link">Home</Link>
            
            {
              !(user && user.isAdmin) && (
                <>
                  <Link to="/plantas" className="nav-link">Plantas</Link>
                  <Link to="/flores" className="nav-link">Ramos</Link>
                </>
              )
            }

            {user && user.isAdmin && (
              <>
                <Link to="/admin/product" className="nav-link">Admin</Link>
              </>
            )}

            {user && !user.isAdmin && (
              <>
                <Link to="/profile" className="nav-link">
                  Profile
                </Link>
              </>
            )}

            {isLoggedIn ? (
              <>
                <button onClick={logOutUser} className="nav-button">Logout</button>
              </>
            ) : (
              <>
                <Link to="/signup" className="nav-link">Sign Up</Link>
                <Link to="/login" className="nav-link">Login</Link>
              </>
            )}

            {user && !user.isAdmin && (
              <>
                <span className="holaUser">🌷 Hola {user.firstName}</span>
              </>
            )}

          


            {showCart &&
              <div className="miniCart">
                <Cart></Cart>
              </div>
            }

            
          </Nav> 
          <Nav> 
            <Nav.Link eventKey={2} href="#cart" style={{minWidth:"300px"}}>
          
              <div className="cartNav">
                {/* Mostrar el carrito solo si no está logueado un usuario admin */
                (!user || (user && !user.isAdmin)) && (
                  <>
               
                    <button onClick={toggleCart} className="nav-button"> 🛒 <sup>{cartCounter}</sup> </button>
                  </>
                )}
              </div>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default CustomNavbar;
