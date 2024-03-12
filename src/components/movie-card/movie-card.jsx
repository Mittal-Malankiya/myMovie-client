import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, user, token, setUser }) => {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    if (user.FavoriteMovies && user.FavoriteMovies.includes(movie.id)) {
      setFavorite(true);
    }
  }, [user]);

  const addFavMovie = () => {
    fetch(
      `https://myflixapp-cw0r.onrender.com/users/${user.userName}/movies/${movie.id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("We couldn't add your favorite movie");
        }
      })
      .then((user) => {
        if (user) {
          alert("A new movie was added to your favorites!");
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
          setFavorite(true);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const delFavMovie = () => {
    fetch(
      `https://myflixapp-cw0r.onrender.com/users/${user.userName}/movies/${movie.id}`,
      { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("We couldn't remove it");
        }
      })
      .then((user) => {
        if (user) {
          alert("You deleted a movie from your favorites!");
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
          setFavorite(false);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <Card className="h-100">
      <Card.Body className="mb-3">
        <Card.Img variant="top" src={movie.banana} />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.genre}</Card.Text>
        </Card.Body>
        <Card.Body>
          <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
            <Button variant="link">Open</Button>
          </Link>
        </Card.Body>
        <Card.Body>
          {!favorite ? (
            <Button onClick={addFavMovie}>Add?</Button>
          ) : (
            <Button onClick={delFavMovie}>Remove?</Button>
          )}
        </Card.Body>
      </Card.Body>
    </Card>
  );
};
MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    banana: PropTypes.string.isRequired,
    Description: PropTypes.string,
    Director: PropTypes.string,
  }).isRequired,
};
