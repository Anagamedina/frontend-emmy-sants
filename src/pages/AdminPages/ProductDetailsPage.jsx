import React, { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import authService from '../../services/auth.service';
import { AuthContext } from '../../context/auth.context';

function ProductDetailsPage() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const backendUrl = 'http://localhost:5005';
    authService.api
      .get(`${backendUrl}/api/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const updatedProduct = {
      nombre: product.nombre,
      descripcion: product.descripcion,
      precio: product.precio,
      categoria: product.categoria,
      imagen: product.imagen,
      amount: product.amount,
    };

    const backendUrl = 'http://localhost:5005';
    authService.api
      .put(`${backendUrl}/api/products/${id}`, updatedProduct)
      .then((response) => {
        setIsEditing(false);
      })
      .catch((error) => {
        console.error('Error al guardar los cambios:', error);
      });
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('new-product-image', file);

      const backendUrl = 'http://localhost:5005';

      authService.api
        .put(`${backendUrl}/api/products/${id}/update-image`, formData)
        .then((response) => {
          const updatedImageUrl = response.data.imagen;
          setProduct({ ...product, imagen: updatedImageUrl });
          setIsEditing(false);
        })
        .catch((error) => {
          console.error('Error al cambiar la imagen:', error);
        });
    }
  };

  return (
    <Container className="contentProducts">
      <Row>
        <Col md={4}>
          <Card>
            <Card.Img
              variant="top"
              src={product.imagen}
              alt={product.nombre}
              style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
            />
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title style={{ fontSize: '3rem' }}>
                {isEditing ? (
                  <input
                    type="text"
                    value={product.nombre}
                    onChange={(e) => setProduct({ ...product, nombre: e.target.value })}
                  />
                ) : (
                  product.nombre
                )}
              </Card.Title>
              <Card.Text style={{ fontSize: '1.2rem' }}>
                {isEditing ? (
                  <textarea
                    value={product.descripcion}
                    onChange={(e) => setProduct({ ...product, descripcion: e.target.value })}
                  />
                ) : (
                  product.descripcion
                )}
              </Card.Text>
              <Card.Text>
                {isEditing ? (
                  <input
                    type="number"
                    value={product.precio}
                    onChange={(e) => setProduct({ ...product, precio: e.target.value })}
                  />
                ) : (
                  `Precio: ${product.precio}€`
                )}
              </Card.Text>
              <Card.Text>
                {isEditing ? (
                  <input
                    type="number"
                    value={product.amount}
                    onChange={(e) => setProduct({ ...product, amount: e.target.value })}
                  />
                ) : (
                  `Cantidad: ${product.amount}`
                )}
              </Card.Text>

              {user && user.isAdmin && (
                <div>
                  {isEditing ? (
                    <div>
                      <Button className="btn-info text-light mr-3 mb-3" onClick={handleSaveClick}>
                        Guardar Cambios
                      </Button>
                      <Button variant="danger" className=" mb-3" onClick={handleCancelClick}>
                        Cancelar
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <Button className="btn-info text-light mb-3" onClick={handleEditClick}>
                        Editar
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {isEditing && (
                <div className="custom-input-file col-md-6 col-sm-6 col-xs-6">
                  <input type="file" accept="image/*" className="input-file" onChange={handleImageChange} />
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetailsPage;
