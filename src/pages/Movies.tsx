import { useEffect, useState } from "react";
import axios from "axios";
import { apiKey, popular } from "../data/api";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
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
    <div>
      <div className="m-auto w-[500px] flex justify-center items-center bg-slate-300 rounded-md">
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
          <div key={film.id} className="p-5 flex flex-col border-2">
            <h3>{film.title}</h3>
            {film.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w300${film.poster_path}`}
                alt={`${film.title}`}
              />
            )}
            <h4>{film.release_date}</h4>
            <button onClick={() => handleMovieCart(film.id)}>See more</button>
          </div>
        ))}
      </div>
    </div>
  );
}
