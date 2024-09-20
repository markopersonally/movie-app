import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { apiKey } from "../data/api";

import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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
  const navigate = useNavigate();

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
    <div className="flex flex-col gap-5">
      <Button
        className="w-[100px]"
        variant="contained"
        color="secondary"
        onClick={() => navigate("/movies")}
      >
        <ArrowBackIcon />
      </Button>
      <div className="flex gap-4">
        <img
          className="w-[300px] h-[350px]"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="w-[300px] flex flex-col flex-wrap gap-5">
          <h2 className="text-xl font-bold">{movie.title}</h2>
          <p>{movie.overview}</p>
          <h4 className="text-xl font-bold">
            Release Date: {movie.release_date}
          </h4>
        </div>
      </div>
    </div>
  );
}
