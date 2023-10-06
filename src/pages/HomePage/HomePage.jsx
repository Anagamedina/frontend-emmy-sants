import React from 'react';
import { Link } from 'react-router-dom'; // Asegúrate de importar Link desde 'react-router-dom'
import "./HomePage.css";
import plantas from "../../img/plantas.jpg"
import flores from "../../img/flores.jpg"

function HomePage() {
  return (
    <div className="content">
      <div className='divTitleHome' >
        <h3 className='titleHome'>Somos tu floristería en la web</h3>
      </div>
      <div className='divProducts' >
        <div className="plantas">
          <Link to="/plantas">
            <img src={plantas} alt="Plantas" />
            <h2 className="titulo">Plantas</h2>
          </Link>
        </div>
        <div className="flores">
          <Link to="/flores">
            <img src={flores} alt="Floress" />
            <h2 className="titulo">Ramos</h2>
          </Link>
        </div>
      </div>
      <footer className='divFooterText' >
        <p className='footerText'>Carrer de Pamplona 95, Local 7, Barcelona, 08090</p>
        <p className='footerText'>Telefónos 666 78 78 90 / 934 77 77 80</p>
        
      </footer>
    </div>
  );
}

export default HomePage;