import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import "./profile-view.scss";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const ProfileView = ({ user, token, movies, setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [favoriteMovies, setfavoriteMovies] = useState([]);

  console.log("profile user", user);
  console.log("Movies outside: ", movies);

  useEffect(() => {
    fetch(`https://myflixapp-cw0r.onrender.com/users/${user.userName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Parse JSON response
        } else {
          throw new Error("Get failed");
        }
      })
      .then((user) => {
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
          console.log("updated user", user);

          // from the user variable get the favorite movies Ids

          let favoriteMovieIds = user.favoritemovie;
          console.log("favorite movie ids", favoriteMovieIds);

          //from the movies varibale apply a filter in which the id of the movie is the same as favorite movies ids take above
          // Filter the movies based on the favorite movie IDs
          console.log("movies in profile", movies);

          const updatedFavoriteMovies = movies.filter((movie) =>
            favoriteMovieIds.includes(movie.id)
          );
          console.log("updatedFavoriteMovies", updatedFavoriteMovies);
          setfavoriteMovies(updatedFavoriteMovies);
          // Perform any additional actions if necessary
          console.log("Favorite movies:", favoriteMovies);
          alert("GET successful");
        }
      })
      .catch((error) => {
        console.error("Error during GET:", error);
        alert("GET failed");
      });
  }, []);

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
    fetch(`https://myflixapp-cw0r.onrender.com/users/${user.email}`, {
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
          localStorage.removeItem("user"); // Remove user data from localStorage
          window.location.reload(); // Reload the page
        } else {
          alert("Could not delete account");
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <>
      <Row>
        {/* Profile Information */}
        <Col md={12}>
          <Card className="mt-2 mb-3">
            <Card.Body>
              <Card.Title>Profile Information</Card.Title>
              <p>Name: {user.userName}</p>
              <p>Email: {user.email}</p>
              <p>Birthday: {user.birthday}</p>
            </Card.Body>
          </Card>
        </Col>

        {/* Update User Profile */}
        <Col md={12}>
          <Card className="mt-2 mb-3">
            <Card.Body>
              <Card.Title>Update User Profile</Card.Title>
              <Form>
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
                  <br />
                </Form.Group>
                <div className="text-center">
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={handleUpdate}
                  >
                    Update Profile
                  </Button>{" "}
                  <Link to="/login">
                    <Button variant="danger" onClick={deregAccount}>
                      Delete Account
                    </Button>
                  </Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        {/* Favorite Movies */}
        <Col md={12}>
          <Card className="mt-2 mb-3">
            <Card.Body>
              <Card.Title>Favorite Movies</Card.Title>
              {/* <Row className="justify-content-center"> */}
              {favoriteMovies.length > 0 ? (
                favoriteMovies.map((movie) => (
                  <Col
                    md={6}
                    className="mx-2 mt-2 mb-5 col-2 similar-movies-img"
                    key={movie.id}
                  >
                    <MovieCard
                      movie={movie}
                      user={user}
                      token={token}
                      setUser={setUser}
                    />
                  </Col>
                ))
              ) : (
                <Col>
                  <p>There are no favorite movies.</p>
                </Col>
              )}
              {/* </Row> */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};
