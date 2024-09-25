import { useEffect, useState } from "react";
import axios from "axios";
import { apiKey, popular } from "../data/api";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

interface Movies {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

export function Movies() {
  const [movies, setMovies] = useState<Movies[]>([]);
  const [searchMovie, setSearchMovie] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get(`${popular}?api_key=${apiKey}`).then((response) => {
      const result = response.data.results;
      setMovies(result);
    });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchMovie(event.target.value);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchMovie.toLowerCase())
  );

  const handleMovieCart = (id: number) => {
    navigate(`/movies/${id}`);
  };

  return (
    <div className="md:w-full">
      <div className="m-auto w-[500px] md:w-max flex justify-center items-center bg-slate-300 rounded-md">
        <InputBase
          placeholder="Search"
          value={searchMovie}
          onChange={handleSearchChange}
          className="p-2 w-full text-bold"
        />
        <IconButton type="submit">
          <SearchIcon />
        </IconButton>
      </div>
      <div className="mt-10 flex flex-wrap gap-5 items-center justify-center">
        {filteredMovies.map((film) => (
          <div
            key={film.id}
            className="p-5  flex flex-col gap-5 bg-slate-600 rounded-lg"
          >
            <h3 className="text-xl font-bold text-violet-400">{film.title}</h3>
            {film.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w300${film.poster_path}`}
                alt={`${film.title}`}
              />
            )}
            <h4 className="text-xl font-bold text-violet-300">
              Date: {film.release_date}
            </h4>
            <Button
              onClick={() => handleMovieCart(film.id)}
              variant="contained"
              color="secondary"
            >
              See more...
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
