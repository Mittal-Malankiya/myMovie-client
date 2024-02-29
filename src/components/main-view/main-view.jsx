import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Infinite Dreams",
      image: "https://m.media-amazon.com/images/I/81GsozHQ86L._SY466_.jpg",
      genre: "Horror",
      director: "James Wan",
      description:
        "Another terrifying horror film from James Wan that will haunt your dreams.",
      bio: "James Wan is a Malaysian-Australian film director, screenwriter, and producer. He is best known for his work in the horror genre.",
    },
    {
      id: 2,
      title: "Whispers in the Dark",
      image:
        "https://m.media-amazon.com/images/I/516TEgcmF4L._SY445_SX342_.jpg",
      genre: "Fantasy",
      director: "Guillermo del Toro",
      description:
        '"The Enchanted Kingdom," embark on a magical journey to a world where dragons soar through the skies, ancient spells come to life, and mystical creatures inhabit enchanted forests. Follow the epic quest of a young hero as they discover their hidden powers and join forces with a fellowship of wizards, elves, and talking animals.',
      bio: "Guillermo del Torois a Malaysian-Australian film director, screenwriter, and producer. He is best known for his work in the horror genre.",
    },
    {
      id: 3,
      title: "Beyond the Horizon",
      image:
        "https://m.media-amazon.com/images/I/41v1e4oMpSL._SY445_SX342_.jpg",
      genre: "Thriller",
      director: "David Fincher",
      description:
        "A pulse-pounding thriller that will keep you guessing until the very end.",
      bio: "David Fincher is an American film director and producer. He is known for his dark and stylish thrillers, including 'Se7en' and 'Fight Club'.",
    },
    {
      id: 4,
      title: "Shadow of the Past",
      image:
        "https://m.media-amazon.com/images/I/51WuRWAAbuL._SY445_SX342_.jpg",
      genre: "Adventure",
      director: "Peter Jackson",
      description:
        "A thrilling adventure set in a fantastical world filled with danger and wonder.",
      bio: "Peter Jackson is a New Zealand film director, producer, and screenwriter. He is best known for directing the 'Lord of the Rings' film trilogy.",
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

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
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
