import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const LoginView = () => {
  // State to manage the input values
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      userName: username,
      password: password,
    };

    fetch("https://myflixapp-cw0r.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response: ", data);
        if (data.user) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", data.user);
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        alert("Something went wrong");
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1> Login to your account </h1>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          minLength={5}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
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
        />
      </Form.Group>
      <br />
      <Button type="submit">Login</Button>
    </Form>
  );
};
