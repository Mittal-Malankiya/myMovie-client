import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Form, InputGroup } from "react-bootstrap";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [search, setSearch] = useState("");

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
            Imagepath: movie.image,
          };
        });

        setMovies(moviesFromApi);
        setFilteredMovies([]);
        console.log("Movies from API", movies);
        localStorage.setItem("movies", JSON.stringify(moviesFromApi));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [token]);

  const handleSearch = (e) => {
    const search = e.target.value;
    console.log("Searchbar value: ", search);

    // const storedMovies = JSON.parse(localStorage.getItem("movies"));
    const storedMovies = movies;
    console.log("Stored movies: ", storedMovies);

    //Filter movies by title and genre
    const filteredMovies = storedMovies.filter((movie) => {
      // Check if the movie's title or genre includes the search query
      return (
        movie.title.toLowerCase().includes(search.toLowerCase()) ||
        movie.genre.toLowerCase().includes(search.toLowerCase()) ||
        movie.director.toLowerCase().includes(search.toLowerCase())
      );
    });

    console.log("Filtered movies: ", filteredMovies);

    //Update the state with the filtered movies
    setFilteredMovies(filteredMovies);
  };

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        search={search}
        handleSearch={handleSearch}
        movies={movies}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />
      <Form>
        <InputGroup className="my-4">
          <Form.Control
            onChange={(e) => handleSearch(e)}
            placeholder="Search for a movie..."
          />
        </InputGroup>
      </Form>
      <br />

      <Row className="justify-content-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={4}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={4}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col> The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-5" key={movie.id} sm={6} md={4} lg={3}>
                        <MovieCard
                          key={movie.id}
                          movie={movie}
                          user={user}
                          token={token}
                          setUser={setUser}
                        />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <>
                    <Col md={5}>
                      <ProfileView
                        user={user}
                        token={token}
                        setUser={setUser}
                        movies={movies}
                        onDelete={() => {
                          setUser(null);
                          setToken(null);
                          localStorage.clear();
                        }}
                      />
                    </Col>
                  </>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies
                      .filter((movie) => {
                        return (
                          search.trim() === "" ||
                          movie.title
                            .toLowerCase()
                            .includes(search.toLowerCase())
                        );
                      })
                      .map((movie) => (
                        <Col className="mb-4" key={movie.id} md={3}>
                          <MovieCard movie={movie} />
                        </Col>
                      ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
