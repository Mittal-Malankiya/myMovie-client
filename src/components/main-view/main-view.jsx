import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  // const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");
  // const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://myflixapp-cw0r.onrender.com/movies")
      .then((response) => response.json())
      .then((data) => {
        console.log("Movie from API", data);
        const moviesFromApi = data.docs.map((movie) => {
          return {
            movieid: movie.movieid,
            title: movie.movieName,
            genre: movie.genre,
            description: movie.description,
            director: movie.director,
            bio: movie.bio,
          };
        });

        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [token]);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.movieid}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
