# Emmy Sants E-Commerce Website
This project has been developed by Ana Gabriela Medina and Alejandro van den Bussche, two passionate web developers with a deep commitment to excellence. Our project represents a fully functional e-commerce platform for the "Emmy Sants" florist, located in the beautiful city of Barcelona. It's a MERN Stack application, check the backend repository [here](https://github.com/Anagamedina/backend-emmy-sants).

## About
Our project is centered around the development of an e-commerce platform for a florist specializing in the sale of plants and bouquets. This platform is not only designed to provide buyers with a convenient shopping experience but also offers a comprehensive control panel for the florist owner.
Owner's Control Panel

We've implemented a robust and user-friendly control panel for the florist owner. From this panel, she can manage all aspects of her online business:

## Product Management
    Easily add new products, update details like name, description, price, and stock, and remove products that are no longer available.

## Order Management:
    Review all received orders, mark them as delivered, and maintain a record of past orders.

## Stock Control: 
    Keep product stock up-to-date, ensuring accurate product availability at all times.

## Image Management: 
    Simplify product image uploads using the Cloudinary library, ensuring visually appealing product presentation on the website.

## Secure Authentication:
    We provide a secure authentication system, allowing the owner to log into her control panel privately and securely.
    
![Project Image]")

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

| Route          | Privacy | Renders                           |
|----------------|--------|---------------------------------------|
| /        | Public   | HomePage.  |
| /logout        | Public   | Cierre de sesión de la propietaria/compradores. |
| /signup        | Public   | Registro de la propietaria/compradores.        |

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

