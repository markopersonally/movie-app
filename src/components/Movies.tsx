import { useEffect, useState } from "react";
import axios from "axios";

import { apiKey, popular } from "../data/api";

interface Movies {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

export function Movies() {
  const [movies, setMovies] = useState<Movies[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get(`${popular}?api_key=${apiKey}`).then((response) => {
      const result = response.data.results;
      setMovies(result);
      console.log(result);
    });
  };

  return (
    <>
      {movies.map((film) => (
        <div key={film.id}>
          <h3>{film.title}</h3>
          {film.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w300${film.poster_path}`}
              alt={`${film.title}`}
            />
          )}
          <h4>{film.release_date}</h4>
        </div>
      ))}
    </>
  );
}
