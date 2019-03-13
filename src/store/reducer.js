import movies from "../data";

const initialState = {
  watchListQuery: "",
  watchedListQuery: "",
  watchList: [],
  watched: [],
  tempMovieName: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_WATCH_LIST_MOVIES":
      return {
        ...state,
        watchList: movies.filter(movie => movie.is_watched === false)
      };

    case "GET_WATCHED_LIST_MOVIES":
      return {
        ...state,
        watched: movies.filter(movie => movie.is_watched === true)
      };

    case "TAKE_MOVIE_NAME":
      return {
        ...state,
        tempMovieName: action.payload
      };

    default:
      return state;
  }
};

export default reducer;
