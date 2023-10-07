import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from "../../img/logoemmy.png";
import { FaBars, FaShoppingCart } from 'react-icons/fa'; // Importa el icono del carrito de compras
import "./Navbar.css"; //

function CustomNavbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="content">
      <Navbar bg="rgb(206, 139, 189)" expand="lg" expanded={expanded} className={`nav ${expanded ? 'expanded' : ''}`}>
        <Navbar.Brand href="/" className="logo">
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
            <Link to="/plantas" className="nav-link">Plantas</Link>
            <Link to="/flores" className="nav-link">Ramos</Link>
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
                <span className="holaUser" >    🌷  Hola {user.firstName}</span>
              </>
            )}

            {/* Enlace del carrito de compras */}
            <Link to="/products/shoppingcart" className="nav-link">
              <FaShoppingCart />
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default CustomNavbar;
