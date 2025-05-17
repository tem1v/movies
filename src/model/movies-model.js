import { generateID } from "../utils.js";
import { movies } from "../mock/movie.js";

export default class MoviesModel {
    #boardmovies = movies;
    #observers = [];
    #currentFilter = "all";

    get movies() {
        return this.#currentFilter === "all"
            ? this.#boardmovies
            : this.#boardmovies.filter(
                  (m) => m.isWatched === this.#currentFilter
              );
    }

    setFilter(status) {
        if (status === "all") {
            this.#currentFilter = "all";
        } else if (status === "watched") {
            this.#currentFilter = true;
        } else if (status === "unwatched") {
            this.#currentFilter = false;
        }
        this._notifyObservers();
    }

    getmoviesByStatus(isWatched) {
        return this.#boardmovies.filter(
            (movie) => movie.isWatched === isWatched
        );
    }

    updateMovie(movieId, updatedFields) {
        this.#boardmovies = this.#boardmovies.map((m) =>
            m.id === movieId ? { ...m, ...updatedFields } : m
        );
        this._notifyObservers();
    }

    addMovie(movieData) {
        const newMovie = {
            id: generateID(),
            ...movieData,
        };
        this.#boardmovies.push(newMovie);
        this._notifyObservers();
        return newMovie;
    }

    deleteMovie(MovieId) {
        this.#boardmovies = this.#boardmovies.filter(
            (movie) => movie.id !== MovieId
        );
        this._notifyObservers();
    }

    addObserver(observer) {
        this.#observers.push(observer);
    }

    removeObserver(observer) {
        this.#observers = this.#observers.filter((obs) => obs !== observer);
    }

    _notifyObservers() {
        this.#observers.forEach((observer) => observer());
    }
}
