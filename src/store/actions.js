const GET_WATCH_LIST_MOVIES = "GET_WATCH_LIST_MOVIES";
const GET_WATCHED_LIST_MOVIES = "GET_WATCHED_LIST_MOVIES";
const TAKE_MOVIE_NAME = "TAKE_MOVIE_NAME";

export const getWatchListMovies = () => {
  return {
    type: GET_WATCH_LIST_MOVIES
  };
};

export const getWatchedListMovies = () => {
  return {
    type: GET_WATCHED_LIST_MOVIES
  };
};

export const takeMovieName = movieName => {
  return {
    type: TAKE_MOVIE_NAME,
    payload: "movieName"
  };
};
