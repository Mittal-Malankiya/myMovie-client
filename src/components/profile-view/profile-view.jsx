import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
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
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>User Profile</Card.Title>
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
      <br />
      <Card>
        <h2 className="mt-5 text-center text-md-start">Favorite Movies</h2>
        <Row className="justify-content-center">
          {favoriteMovies.length > 0 ? (
            favoriteMovies.map((movie) => (
              <Col
                md={5}
                className="mx-2 mt-2 mb-5 col-6 similar-movies-img"
                key={movie.id}
              >
                <MovieCard
                  movie={movie}
                  user={user}
                  token={token}
                  setUser={setUser}

                  // addFavMovie={addFavMovie}
                  // delFavMovie={delFavMovie}
                />
              </Col>
            ))
          ) : (
            <Col>
              <p>There are no favorites Movies</p>
            </Col>
          )}
        </Row>
      </Card>
    </Container>
  );
};
