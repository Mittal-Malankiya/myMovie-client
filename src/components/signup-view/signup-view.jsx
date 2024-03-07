import React from "react";
import { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Card, CardGroup, Row, col, Container } from "react-bootstrap";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault(event);
    const isoDate = new Date(birthday);

    const data = {
      userName: username,
      email: email,
      birthday: isoDate,
      password: password,
    };

    fetch("https://myflixapp-cw0r.onrender.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful");
        window.location.reload();
      } else {
        alert("Signup failed");
      }
    });
  };
  return (
    <Card className="h-100">
      <Card.Body className="mb-3">
        <Form onSubmit={handleSubmit}>
          <br />
          <h1> Create an account </h1>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              minLength={5}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter a username"
            />
          </Form.Group>
          <br />
          <Form.Group controlId="formBirthday">
            <Form.Label> Birthday: </Form.Label>
            <Form.Control
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required
            />
          </Form.Group>
          <br />
          <Form.Group controlId="formEmail">
            <Form.Label> Email: </Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email "
            />
          </Form.Group>
          <br />
          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password must be 8 characters"
            />
          </Form.Group>
          <br />
          <Button variant="primary" type="submit">
            {" "}
            Sign up{" "}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};
