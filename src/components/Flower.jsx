import { animated } from 'react-spring';

function Flower({ x, y }) {
  return (
    <animated.div
      style={{
        position: 'absolute',
        width: '20px', // Ancho de la flor
        height: '20px', // Alto de la flor
        backgroundImage: 'url("url_de_tu_imagen_de_flor.png")', // Reemplaza con la URL de tu imagen de flor
        backgroundSize: 'cover',
        transform: `translate(${x}px, ${y}px)`,
      }}
    />
  );
}

