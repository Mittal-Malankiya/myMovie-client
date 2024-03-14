import React, { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const ProfileView = ({ user, token, movies, setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const favoriteMovies = movies.filter((m) =>
    user?.FavoriteMovies?.includes(m._id)
  );
  console.log(user);
  console.log(movies);

  const handleUpdate = (event) => {
    event.preventDefault();
    // const user = JSON.parse(localStorage.getItem("user"));
    const data = {
      username,
      password,
      email,
      birthdate,
    };
    fetch(`https://myflixapp-cw0r.onrender.com/users/${user.userName}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Parse JSON response
        } else {
          throw new Error("Update failed");
        }
      })
      .then((updatedUser) => {
        if (updatedUser) {
          localStorage.setItem("user", JSON.stringify(updatedUser));
          setUser(updatedUser);
          alert("Update successful");
        }
      })
      .catch((error) => {
        console.error("Error during update:", error);
        alert("Update failed");
      });
  };

  const deregAccount = () => {
    fetch(`https://myflixapp-cw0r.onrender.com/users/${user.userName}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          alert(
            "Your account has been successfully deleted. Sorry to see you go!"
          );
          // window.location.reload(); // Reload the page        } else {
          alert("Could not delete account");
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3>Your Favorite Movies:</h3>
        </Col>
        {favoriteMovies.map((movie) => (
          <Col className="mb-4" key={movie.id} xl={2} lg={3} md={4} xs={6}>
            <Figure>
              <Figure.Image src={movie.ImagePath} />
            </Figure>
            <MovieCard movie={movie} />
          </Col>
        ))}{" "}
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>User Profile</Card.Title>
              <Form onSubmit={handleUpdate}>
                <Form.Group controlId="profileUsername">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="5"
                  />
                </Form.Group>
                <Form.Group controlId="profilePassword">
                  <Form.Label>New Password:</Form.Label>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Show Password"
                    onChange={() => setShowPassword(!showPassword)}
                  />
                </Form.Group>
                <Form.Group controlId="profileEmail">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formBirthdate">
                  <Form.Label>Date of Birth:</Form.Label>
                  <Form.Control
                    type="date"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                    required
                  />
                  <br></br>
                </Form.Group>
                <Link to="login"></Link>
                <Button variant="primary" type="submit" onClick={handleUpdate}>
                  Update Profile
                </Button>
                <br></br>
                <br></br>

                <Link to="/login">
                  <Button
                    variant="danger"
                    onClick={() => {
                      if (
                        confirm("Are you sure you want to delete your account?")
                      ) {
                        deregAccount();
                      }
                    }}
                  >
                    Delete Account
                  </Button>
                </Link>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
