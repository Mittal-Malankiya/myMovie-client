import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";
import PropTypes from "prop-types";
// import Button from "react-bootstrap/Button";
export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((movie) => movie.id === movieId);
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
          <button className="back-button">Back</button>
        </Link>
      </>
    </div>
  );
};
MovieView.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genre: PropTypes.string,
    director: PropTypes.string,
    bio: PropTypes.string,
    banana: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
