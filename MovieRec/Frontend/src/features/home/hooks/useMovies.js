import { useContext } from "react";
import { movieContext } from "../movie.context";

export const useMovies = () => {
  const context = useContext(movieContext);

  return {
    movies: Array.isArray(context?.movies) ? context.movies : [],
    sections: context?.sections || {},
    loading: context?.loading || false,
    error: context?.error || null,
  };
};