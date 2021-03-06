import React, { Component } from "react";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

// import movies from "./data";
import { connect } from "react-redux";
import * as actionsManager from "../src/store/actions";

class App extends Component {
  state = {
    watchListQuery: "",
    watchedListQuery: "",
    // watchList: [],
    // watched: [],
    tempMovieName: ""
  };

  // getWatchListMovies = () => {
  //   return movies.filter(movie => movie.is_watched === false);
  // };

  // getWatchedListMovies = () => {
  //   return movies.filter(movie => movie.is_watched === true);
  // };

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
      watched: this.state.watched.filter(deletedMovie => deletedMovie !== movie)
    });
  };

  deleteUnwatchMovie = movie => {
    this.setState({
      watchList: this.state.watchList.filter(
        deletedMovie => deletedMovie !== movie
      )
    });
  };

  filterWatchListMovies = query => {
    this.setState({ watchListQuery: query.target.value });
  };

  filterWatchedListMovies = query => {
    this.setState({ watchedListQuery: query.target.value });
  };

  componentDidMount = () => {
    this.props.getWatchListMovies();
    this.props.getWatchedListMovies();
    // this.setState({
    //   watchList: this.state.watchList.concat(this.getWatchListMovies()),
    //   watched: this.state.watched.concat(this.getWatchedListMovies())
    // });
  };

  render() {
    const watchList = this.props.watchList.map(movie => {
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

    const watched = this.props.watched.map(movie => {
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
      <div className="App container text-center">
        <div className="row justify-content-md-center my-4">
          <h1 className="my-3">
            <span className="badge badge-light">Movies Watch List</span>
          </h1>
        </div>
        <div className="row justify-content-md-center my-4">
          <div className="col-4">
            <h2 className="my-3">
              <span className="badge badge-light">
                Watch List : <span />
                {this.props.watchList.length}
              </span>
            </h2>
            <div className="col-12">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Add movie to the list .."
                  value={this.props.tempMovieName}
                  onChange={this.props.takeMovieName}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-info"
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
            <input
              value={this.state.value}
              onChange={this.filterWatchListMovies}
              type="text"
              className="form-control ds-input"
              placeholder="Search .."
              style={{ position: "relative", verticalAlign: "top" }}
            />
            {watchList}
          </div>
          <div className="col-4">
            <h2 className="my-3">
              <span className="badge badge-light">
                Watched : <span />
                {this.props.watched.length}
              </span>
            </h2>
            <input
              type="text"
              value={this.state.value}
              onChange={this.filterWatchedListMovies}
              className="form-control ds-input"
              placeholder="Search .."
              style={{ position: "relative", verticalAlign: "top" }}
            />
            {watched}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    watchList: state.watchList,
    watched: state.watched,
    tempMovieName: state.tempMovieName
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getWatchListMovies: () => dispatch(actionsManager.getWatchListMovies()),
    getWatchedListMovies: () => dispatch(actionsManager.getWatchedListMovies()),
    takeMovieName: () => dispatch(actionsManager.takeMovieName())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
