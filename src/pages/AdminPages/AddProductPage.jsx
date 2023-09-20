import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function AddProductPage() {
    const { register, handleSubmit } = useForm();
  
    const onSubmit = async (data) => {
      try {
        const formData = new FormData();
        formData.append('nombre', data.nombre);
        formData.append('descripcion', data.descripcion);
        formData.append('precio', data.precio);
        formData.append('categoria', data.categoria);
        formData.append('product-image', data['product-image'][0]);
  
        const backendUrl = 'http://localhost:5005'; // Cambia la URL según tu configuración
  
        const response = await axios.post(`${backendUrl}/admin/product/create`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        console.log('Product created:', response.data);
      } catch (error) {
        console.error('Error creating product:', error);
      }
    };
  
    return (
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
    );
  }

export default AddProductPage
