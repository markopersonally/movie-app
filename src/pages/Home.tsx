import { useState, useEffect } from "react";
import axios from "axios";
import { apiKey, popular } from "../data/api";

interface MovieList {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  backdrop_path: string;
}

export function Home() {
  const [movieList, setMovieList] = useState<MovieList[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get(`${popular}?api_key=${apiKey}`).then((response) => {
      const result = response.data.results;
      setMovieList(result);
      console.log(result);
    });
  };

  return (
    <main className="max-[1400px]">
      <div className="bg-[url('./images/main-background.jpg')] absolute top-0 left-0 w-screen h-screen blur z-[-5]"></div>
      <div className="mt-10 flex flex-wrap gap-5 justify-center items-center">
        {movieList.map((film) => (
          <div key={film.id}>
            {film.poster_path && (
              <img
                className="hover:scale-[1.1]"
                src={`https://image.tmdb.org/t/p/w200${film.backdrop_path}`}
                alt={`${film.title}`}
              />
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
