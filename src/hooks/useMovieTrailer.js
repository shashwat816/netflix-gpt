import { useEffect } from "react";
import { API_OPTION } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addMovieTrailer } from "../utils/movieSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    getVideoTrailer();
  }, []);

  const getVideoTrailer = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "/videos?language=en-US",
      API_OPTION
    );

    const json = await data.json();
    const filteredList = json.results.filter(
      (movie) => movie.type === "Trailer"
    );
    const trailer = filteredList ? filteredList[0] : json.results[0];
    dispatch(addMovieTrailer(trailer));
  };
};

export default useMovieTrailer;
