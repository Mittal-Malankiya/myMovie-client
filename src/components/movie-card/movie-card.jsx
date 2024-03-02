import PropTypes from "prop-types";
export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      {movie.title}
    </div>
  );
};
MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genre: PropTypes.array,
    director: PropTypes.string,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
