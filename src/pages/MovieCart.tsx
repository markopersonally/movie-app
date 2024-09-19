import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { apiKey } from "../data/api";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
}

export function MovieCart() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`)
        .then((response) => {
          setMovie(response.data);
        });
    }
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <p>{movie.overview}</p>
      <h4>Release Date: {movie.release_date}</h4>
    </div>
  );
}
