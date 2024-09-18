import { useEffect, useState } from "react";
import axios from "axios";

import { apiKey, popular } from "../data/api";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";

interface Movies {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

export function Movies() {
  const [movies, setMovies] = useState<Movies[]>([]);
  const [searchMovie, setSearchMovie] = useState<string>("");

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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchMovie(event.target.value);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchMovie.toLowerCase())
  );

  return (
    <div>
      <Paper className="">
        <InputBase
          placeholder="Search"
          value={searchMovie}
          onChange={handleSearchChange}
        />
        <IconButton type="submit">
          <SearchIcon />
        </IconButton>
      </Paper>
      <div className="mt-10 flex flex-wrap gap-5 items-center justify-center">
        {filteredMovies.map((film) => (
          <div key={film.id} className="p-5 flex flex-col border-2">
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
      </div>
    </div>
  );
}
