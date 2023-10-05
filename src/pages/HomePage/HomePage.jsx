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
  );
}

export default HomePage;