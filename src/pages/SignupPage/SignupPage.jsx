import "./SignupPage.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleFirstName = (e) => setFirstName(e.target.value);
  const handleLastName = (e) => setLastName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleConfirmPassword = (e) => setConfirmPassword(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    // Create an object representing the request body
    const requestBody = { firstName, lastName, email, password };

    authService
      .signup(requestBody)
      .then((response) => {
        // If the POST request is successful, redirect to the login page
        navigate("/login");
      })
      .catch((error) => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <Container className=" cardSignup justify-content-center align-items-center" >
      <Row className="justify-content-center align-items-center" style={{ minHeight: "100vh"}}>
        <Col xs={12} md={6}>
          <Form className="cardForm" onSubmit={handleSignupSubmit}>
          <h1 className="signupText" >Registro de Usuarios</h1>
            <Form.Group controlId="formBasicFirstName">
              {/* <Form.Label>Nombre:</Form.Label> */}
              <Form.Control className="formField" type="text" placeholder="Nombre  Ej: Pedro" value={firstName} onChange={handleFirstName} />
            </Form.Group>

            <Form.Group controlId="formBasicLastName">
              {/* <Form.Label>Apellido:</Form.Label> */}
              <Form.Control className="formField" type="text" placeholder="Apellido  Ej:Perez" value={lastName} onChange={handleLastName} />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              {/* <Form.Label>Correo Electrónico:</Form.Label> */}
              <Form.Control className="formField" type="email" placeholder="Correo Electronico  Ej: pedrop@gmail.com" value={email} onChange={handleEmail} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              {/* <Form.Label>Contraseña:</Form.Label> */}
              <Form.Control className="formField" type="password" placeholder="Contraseña  Ej: Aaaa1234 (MAY-min-numero)" value={password} onChange={handlePassword} />
            </Form.Group>

            <Form.Group className="formField" controlId="formBasicConfirmPassword">
              {/* <Form.Label>Confirma tu Contraseña:</Form.Label> */}
              <Form.Control type="password" placeholder="Confirma tu Contraseña" value={confirmPassword} onChange={handleConfirmPassword} />
            </Form.Group>

            <Button className="btn-info text-light buttonSignup mr-3 mb-3" type="submit">
              Sign Up
            </Button>
            <p id="linkLoginText" >¿Ya tienes una cuenta? <Link to="/login" id="linkLogin">Haz Login Aquí</Link></p>
          </Form>

          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

          
        </Col>
      </Row>
    </Container>
  );
}

export default SignupPage;
