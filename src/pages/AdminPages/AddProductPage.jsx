import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function AddProductPage() {
  const { register, handleSubmit } = useForm();
  const [products, setProducts] = useState([]);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('nombre', data.nombre);
    formData.append('descripcion', data.descripcion);
    formData.append('precio', data.precio);
    formData.append('categoria', data.categoria);
    formData.append('product-image', data['product-image'][0]);

    const backendUrl = 'http://localhost:5005'; // Cambia la URL según tu configuración

    axios
      .post(`${backendUrl}/admin/product/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log('Product created:', response.data);
        // Después de agregar el producto, refrescamos la lista de productos
        fetchProducts();
      })
      .catch((error) => {
        console.error('Error creating product:', error);
      });
  };

  // Función para obtener la lista de productos
  const fetchProducts = () => {
    const backendUrl = 'http://localhost:5005'; // Cambia la URL según tu configuración

    axios
      .get(`${backendUrl}/admin/products`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []); // Llamar a fetchProducts una vez al montar el componente

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nombre:</label>
          <input type="text" {...register('nombre')} />
        </div>
        <div>
          <label>Descripción:</label>
          <input type="text" {...register('descripcion')} />
        </div>
        <div>
          <label>Precio:</label>
          <input type="number" {...register('precio')} />
        </div>
        <div>
          <label>Categoría:</label>
          <input type="text" {...register('categoria')} />
        </div>
        <div>
          <label>Imagen del producto:</label>
          <input type="file" {...register('product-image')} />
        </div>
        <button type="submit">Crear Producto</button>
      </form>
      <h2>Lista de Productos</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <strong>Nombre:</strong> {product.nombre}<br />
            <strong>Descripción:</strong> {product.descripcion}<br />
            <strong>Precio:</strong> {product.precio}<br />
            <strong>Categoría:</strong> {product.categoria}<br />
            <img src={product.imagen} alt={product.nombre} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddProductPage;
