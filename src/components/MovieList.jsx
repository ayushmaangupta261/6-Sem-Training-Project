import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";

const MovieList = ({ movieTitle }) => {
  const [movieList, setMovieList] = useState([]);
  const apiKey = "f42e443a";

  useEffect(() => {
    console.log("Movie title -> ",movieTitle);
    
    if (movieTitle) {
      fetchMovieDetails(movieTitle);
    }
  }, [movieTitle]);

  const fetchMovieDetails = async (title) => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?t=${title}&plot=full&apikey=${apiKey}`
      );
      console.log(response.data);
      if (response.data && response.data.Response !== "False") {
        setMovieList([response.data]); // putting in array to map later
      } else {
        setMovieList([]);
      }
    } catch (error) {
      console.error("Error fetching movie:", error);
    }
  };

  return (
    <div className="flex overflow-x-auto gap-8 px-3 pt-5 pb-5 scroll-smooth">
      {movieList.map((item, index) => (
        <MovieCard key={index} movie={item} />
      ))}
    </div>
  );
};

export default MovieList;
