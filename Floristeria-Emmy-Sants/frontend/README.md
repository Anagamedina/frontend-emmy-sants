# Emmy Sants E-Commerce Website

Developed as the final project of our web development bootcamp at Ironhack Barcelona. It's a MERN Stack application, check the backend repository [here](link-to-backend-repo).

## About

This project has been carried out by Ana Gabriela Medina and Alejandro van den Bussche, both web developers. It is a real and functional e-commerce website for a florist, Emmy Sants in Barcelona.

## Deployment

You can check the app fully deployed [here](link-to-app-deployment). If you wish to view the API deployment instead, check [here](link-to-api-deployment).

## Work Structure

We developed this project used Trello to organize our workflow.

## Installation Guide

1. Fork this repo
2. Clone this repo

$ cd portfolio-front
$ npm install
$ npm start


## Routes

### Authentication

| Route          | Method | Description                           |
|----------------|--------|---------------------------------------|
| /login         | POST   | Inicio de sesión de la propietaria/compradores.  |
| /logout        | POST   | Cierre de sesión de la propietaria/compradores. |
| /signup        | POST   | Registro de la propietaria/compradores.        |

### Routes and Controllers for the Proprietor (Admin Interface)

#### Product Management:

| Route               | Method | Description                                        |
|---------------------|--------|----------------------------------------------------|
| /admin/productos    | GET    | Obtener una lista de productos.                   |
| /admin/productos    | POST   | Crear un nuevo producto.                          |
| /admin/productos/:id| GET   | Obtener un producto específico.                   |
| /admin/productos/:id| PUT   | Actualizar un producto existente.                 |
| /admin/productos/:id| DELETE| Eliminar un producto.                             |

## Components

- Navbar
- PrivateRoute
- Forms
- Products Cards
- Footer

Any doubts? Contact us!

