import React, { useState, useEffect } from "react";
import { Router, useNavigate } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { Navbar, Nav, Container } from "react-bootstrap";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const MainView = () => {
  // const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    if (user) {
      setFavoriteMovies(user.FavoriteMovies || []);
    }
  }, [user]);

  const onLoggedOut = () => {
    // Handle the logout logic here
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    navigate("/login", { replace: true });
  };

  const handleFavoriteToggle = (movieId) => {
    const url = `https://myflixapp-cw0r.onrender.com/users/${user.Username}/movies/${movieId}`;

    // Check if the movie is already in favorites
    const isFavorite = favoriteMovies.includes(movieId);

    // Use the appropriate method based on whether it's adding or removing
    const method = isFavorite ? "DELETE" : "POST";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((updatedUser) => {
        setFavoriteMovies(updatedUser.FavoriteMovies || []);
      })
      .catch((error) => {
        console.error(
          `Error toggling favorite for movie with ID ${movieId}:`,
          error
        );
      });
  };

  const handleUserUpdate = (updatedUser) => {
    // Implement logic to update user information (e.g., make a request to the /users endpoint)
    console.log("Updating user:", updatedUser);
    // Call a function to update the user information
    onUserUpdate(updatedUser);
  };

  const handleDeregister = () => {
    // Implement logic to deregister the user (e.g., make a request to the /deregister endpoint)
    console.log("Deregistering user:", user);
    // Call a function to deregister the user
    setUser(null);
    setToken(null);
    localStorage.clear();
    navigate("/login", { replace: true });
  };
  //   const navigate = useNavigate();
  //   navigate("/login", { replace: true });
  // };

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://myflixapp-cw0r.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Movie from API", data);
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.movieName,
            genre: movie.genre,
            description: movie.description,
            director: movie.director,
            bio: movie.bio,
            banana: movie.image,
          };
        });

        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [token]);

  return (
    <Router>
      <Container>
        <Navbar.Brand as={Link} to="/">
          Movies App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>

                <Nav.Link as={Link} to="/profile">
                  Back
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Router>
  );
};
