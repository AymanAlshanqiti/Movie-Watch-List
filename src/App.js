import React, { Component } from "react";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import movies from "./data";

class App extends Component {
  state = {
    watchList: [],
    watched: [],
    tempMovieName: ""
  };

  getWatchListMovies = () => {
    return movies.filter(movie => movie.is_watched === false);
  };

  getWatchedListMovies = () => {
    return movies.filter(movie => movie.is_watched === true);
  };

  takeMovieName = movieName => {
    this.setState({ tempMovieName: movieName.target.value });
  };

  addMovieToWatchList = movieName => {
    const movieObj = {
      id: this.state.watchList.length + this.state.watched.length + 1,
      name: movieName,
      is_watched: false
    };
    this.setState({ tempMovieName: "" });
    return this.setState({ watchList: this.state.watchList.concat(movieObj) });
  };

  changeMovieStatusToWatched = movie => {
    this.setState({ watched: this.state.watched.concat(movie) });
    this.setState({
      watchList: this.state.watchList.filter(
        movieFiltered => movieFiltered !== movie
      )
    });
  };

  changeMovieStatusToUnwatched = movie => {
    this.setState({ watchList: this.state.watchList.concat(movie) });
    this.setState({
      watched: this.state.watched.filter(
        movieFiltered => movieFiltered !== movie
      )
    });
  };

  deleteWatchedMovie = movie => {
    this.setState({
      watched: this.state.watched.filter(deletedMovie => deletedMovie != movie)
    });
  };

  deleteUnwatchMovie = movie => {
    this.setState({
      watchList: this.state.watchList.filter(
        deletedMovie => deletedMovie != movie
      )
    });
  };

  componentDidMount = () => {
    this.setState({
      watchList: this.state.watchList.concat(this.getWatchListMovies()),
      watched: this.state.watched.concat(this.getWatchedListMovies())
    });
  };

  render() {
    const watchList = this.state.watchList.map(movie => {
      return (
        <ul className="list-group my-3">
          <li className="list-group-item">
            <span>{movie.name}</span>
          </li>
          <li className="list-group-item">
            <button
              onClick={() => this.changeMovieStatusToWatched(movie)}
              className="btn btn-outline-info mx-1"
            >
              Watched
            </button>
            <button
              onClick={() => this.deleteUnwatchMovie(movie)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </li>
        </ul>
      );
    });

    const watched = this.state.watched.map(movie => {
      return (
        <ul className="list-group my-3">
          <li className="list-group-item list-group-item-light">
            <span>{movie.name}</span>
          </li>
          <li className="list-group-item list-group-item-light">
            <button
              onClick={() => this.changeMovieStatusToUnwatched(movie)}
              className="btn btn-outline-secondary mx-1"
            >
              Unwatch
            </button>
            <button
              onClick={() => this.deleteWatchedMovie(movie)}
              className="btn btn-outline-danger"
            >
              Delete
            </button>
          </li>
        </ul>
      );
    });
    return (
      <div className="container text-center">
        <div className="row justify-content-md-center my-4">dd</div>
        <div className="row justify-content-md-center my-4">
          <div className="col-4">
            <h1 className="my-3">Watch List</h1>
            <div className="col-12">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Add movie to the list .."
                  value={this.state.tempMovieName}
                  onChange={this.takeMovieName}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-info"
                    type="button"
                    onClick={() =>
                      this.addMovieToWatchList(this.state.tempMovieName)
                    }
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
            {watchList}
          </div>
          <div className="col-4">
            <h1 className="my-3">Watched</h1>
            {watched}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
