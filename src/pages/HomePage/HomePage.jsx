import React from 'react';
import { Link } from 'react-router-dom'; // Asegúrate de importar Link desde 'react-router-dom'
import "./HomePage.css";
import plantas from "../../img/plantas.jpg"
import flores from "../../img/flores.jpg"

function HomePage() {
  return (
    <div className="content">
      <div>
        <h3 className='titleHome'>Somos tu floristería en la web</h3>
      </div>
      <div className="plantas">
        <Link to="/plantas">
          <img src={plantas} alt="Plantas" />
          <h2 className="titulo">Plantas</h2>
        </Link>
      </div>
      <div className="flores">
        <img src={flores} alt="Flores" />
        <h2 className="titulo">Flores</h2>
      </div>
    </div>
  );
}

export default HomePage;