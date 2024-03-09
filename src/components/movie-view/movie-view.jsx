import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

export const MovieView = ({ movies, onFavoriteToggle }) => {
  const { movieId } = useParams();
  const decodedMovieId = decodeURIComponent(movieId);
  const movie = movies.find((m) => m.id === decodedMovieId);
  return (
    <div>
      <div>
        <img src={movie.banana} alt={movie.title} />
      </div>
      <div>
        <span>
          <strong>Title:</strong>
        </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>
          <strong>Genre: </strong>
        </span>
        <span>{movie.genre}</span>
      </div>
      <div>
        <span>
          <strong>Director:</strong>
        </span>
        <span>{movie.director}</span>
      </div>
      <div>
        <span>
          <strong>Description:</strong>{" "}
        </span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>
          <strong>Bio: </strong>
        </span>
        <span>{movie.bio}</span>
      </div>
      <>
        <style type="text/css">
          {`
           .btn-flat {
            background-color: #228B22;
            color: white;
                     }
            .btn-xxl {
             padding: 1rem 1.5rem;
              font-size: 1.5rem;
            }
         `}
        </style>
        <Link to={`/`}>
          <button className="back-button" style={{ cursor: "pointer" }}>
            Back
          </button>
        </Link>
        <Button
          variant="outline-primary"
          style={{ cursor: "pointer" }}
          onClick={() => onFavoriteToggle(movie._id)}
        >
          {movie.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </Button>
      </>
    </div>
  );
};
MovieView.propTypes = {
  movies: PropTypes.array.isRequired,
  onFavoriteToggle: PropTypes.func.isRequired,
};
