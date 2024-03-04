import PropTypes from "prop-types";
export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie.image} alt={movie.title} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>Bio: </span>
        <span>{movie.bio}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};
MovieView.propTypes = {
  movie: PropTypes.shape({
    movieid: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genre: PropTypes.string,
    director: PropTypes.string,
    bio: PropTypes.string,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};