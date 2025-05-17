import { render, RenderPosition } from "../src/framework/render.js";
// import BooksModel from "./model/book-model.js";
// import BookFormComponent from "../view/book-form-component.js";
// import BookFilterComponent from "../view/book-filter-component.js";
// import BooksBoardPresenter from "./presenter/books-board-presenter.js";
import MoviesModel from "./model/movies-model.js";
import MovieFormComponent from "../view/movie-form-component.js";
import MovieFilterComponent from "../view/movie-filter-component.js";
import MoviesBoardPresenter from "./presenter/movies-board-presenter.js";

const container = document.querySelector(".container");
render(
    new MovieFormComponent({ onClick: handleNewBookButtonClick }),
    container,
    RenderPosition.AFTERBEGIN
);

const formContainer = document.querySelector(".movie-form");
render(new MovieFilterComponent(), formContainer, RenderPosition.AFTEREND);
const filterContainer = document.querySelector(".movie-filter");

const moviesModel = new MoviesModel();
const moviesBoardPresenter = new MoviesBoardPresenter({
    boardContainer: filterContainer,
    moviesModel: moviesModel,
});

moviesBoardPresenter.init();

function handleNewBookButtonClick() {
    moviesBoardPresenter.createMovie();
}
const form = document.getElementById("movie-form");
if (form) {
    form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        moviesBoardPresenter.createMovie();
    });
}
