import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate,Link } from "react-router-dom";
import { URL } from "../App";

const SignIn = () => {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    

    try {
      const response = await fetch(`${URL}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }, 
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        console.log(data);
        alert('Sign In Successful');

        localStorage.setItem('TOKEN', data.token);
        localStorage.setItem('NAME', data.name);
        localStorage.setItem('USERID', data.userId);

        history('/');
      } else if (response.status === 404) {
        alert('Password is wrong');
      } else if (response.status === 500) {
        alert('User Not Found');
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
    }

    
    
  }

  console.log("hello")

  const mystyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  };


    return (
      <div style={{ backgroundColor: "aliceblue" }}>
        <Container className="auth-form-container" style={mystyle}>
          <Row className="justify-content-center" style={{ width: "100%" }}>
            <Col
              xs={12}
              md={6}
              lg={6}
              style={{
                backgroundColor: "aliceblue",
                display: "flex",
                  justifyContent: "center",
                alignItems:"center"
              }}
            >
              <img
                src="PNG_LH.png"
                alt=""
                style={{ width: "400px", height: "250px" }}
              />
            </Col>
            <Col xs={12} md={6} lg={6} style={{ backgroundColor: "aliceblue" }}>
              <div className="auth-form">
                <h2>Sign In</h2>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="email" className="py-2">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="password" className="py-2">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    
                    className="my-2"
                    style={{
                      // width: "10rem",
                      borderRadius: "10px",
                      backgroundColor: "teal",
                      color: "white",
                      padding: "10px",
                    }}
                  >
                    Sign In
                  </Button>
                  <p className="mt-3">
                    Don't have an account?{" "}
                 <Link to="/signuppage"><Button variant="link">
                      Sign Up
                    </Button>
                    </Link>
                    
                  </p>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
};





export default SignIn;
