import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, onFavoriteToggle, favoriteMovies }) => {
  const isFavorite = favoriteMovies && favoriteMovies.includes(movie._id);

  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.image} />
      <Card.Body className="mb-3">
        <Card.Img src={movie.banana} className="mb-3"></Card.Img>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.genre}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button
            variant="outline-primary"
            style={{ cursor: "pointer" }}
            onClick={() => onFavoriteToggle(movie._id)}
          >
            {isFavorite ? "Remove Favorite" : "Add to Favorites"}{" "}
          </Button>{" "}
        </Link>
      </Card.Body>
    </Card>
  );
};
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    banana: PropTypes.string.isRequired,
  }).isRequired,
  onFavoriteToggle: PropTypes.func.isRequired,
  favoriteMovies: PropTypes.array.isRequired,
};
