import React, { useState } from 'react';
import Compressor from 'compressorjs'; 
import { Container, Row, Col, Alert } from 'react-bootstrap';
import authService from '../../services/auth.service.js'; 
import { useNavigate } from 'react-router-dom';
import './adminProductsPages.css';

function AddProductPage({ history }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: '',
    'product-image': null,
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const clearForm = () => {
    setFormData({
      nombre: '',
      descripcion: '',
      precio: '',
      categoria: '',
      'product-image': null,
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    new Compressor(file, {
      quality: 0.1, 
      success(result) {
        setFormData({ ...formData, 'product-image': result });
      },
      error(err) {
        console.error('Error al comprimir la imagen:', err);
      },
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        formDataToSend.append(key, formData[key]);
      }
    }

    authService.api
      .post('/api/products/create', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log('Product created:', response.data);
        clearForm();
        setSuccessMessage('Producto creado correctamente');
        setErrorMessage('');
        setTimeout(() => {
          setSuccessMessage('');
        }, 5000);

        navigate('/admin/product');
      })
      .catch((error) => {
        console.error('Error creating product:', error);
        setSuccessMessage('');
        setErrorMessage('Error al crear el producto');
      });
  };

  return (
    <div className="contentProducts">
      <div className="message-container">
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      </div>

      <Container>
        <Row>
          <Col xs={12} md={6} lg={6} className="mx-auto">
            <form className="formAdd" onSubmit={onSubmit}>
              <h2 className="addProduct">Crear un Producto</h2>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  placeholder="Coloque aquí el nombre del producto"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="descripcion"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  placeholder="Ingrese una breve descripción del producto"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="precio"
                  name="precio"
                  value={formData.precio}
                  onChange={handleInputChange}
                  placeholder="Ingrese el precio del producto"
                  required
                />
              </div>
              <div className="mb-3">
                <select
                  className="form-select form-select-lg mb-3"
                  onChange={handleInputChange}
                  name="categoria"
                  value={formData.categoria || ''}
                  required
                >
                  <option value="" disabled>
                    Categoría del producto: Elija una opción
                  </option>
                  <option value="plantas">Plantas</option>
                  <option value="ramos">Ramos</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="product-image" className="form-label">
                  Imagen del producto:
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="product-image"
                  name="product-image"
                  onChange={handleImageUpload} 
                  required
                />
              </div>
              <button type="submit" className="btn-info text-light btn">
                Crear Producto
              </button>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AddProductPage;
