import "./LoginPage.css";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import authService from "../../services/auth.service";
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser, user } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    authService
      .login(requestBody)
      .then(async (response) => {
        storeToken(response.data.authToken);
       
        await authenticateUser();
         console.log(user); 
        //  if(user?.isAdmin){
        //   navigate("/admin/product"); 
        //  }else{
        //    navigate("/");
        //  }
      
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <Container className=" cardSignup justify-content-center align-items-center" >
      <Row className="cardSignup justify-content-center align-items-center" style={{ minHeight: "90vh" }}>
        <Col xs={12} md={6}>
          <Form className="cardLoginForm" onSubmit={handleLoginSubmit}>
          <h1 className="loginText">Login</h1>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmail} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={handlePassword} />
            </Form.Group>

            <Button className="btn-info text-light buttonSignup mr-3 mb-3" type="submit">
              Login
            </Button>
            <p className="linkSignupText" >Don't have an account yet? <Link to="/signup" className="linkSignup">Sign Up</Link></p>
          </Form>

          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
