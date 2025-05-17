import MovieListComponent from "../../view/movie-list-component.js";
import MovieItemComponent from "../../view/movie-item-component.js";
import { render, RenderPosition } from "../framework/render.js";
import { generateID } from "../utils.js";
import { Status, StatusLabel } from "../const.js";
import MovieEditComponent from "../../view/movie-edit-component.js";

export default class MoviesBoardPresenter {
    #moviesListComponent = new MovieListComponent();
    #boardContainer = null;
    #moviesModel = null;

    constructor({ boardContainer, moviesModel }) {
        this.#boardContainer = boardContainer;
        this.#moviesModel = moviesModel;
        this.#moviesModel.addObserver(this.#handleModelChange.bind(this));
    }

    init() {
        this.#renderBoard();
        this.#setupFilterHandler();
    }

    #setupFilterHandler() {
        const statusRadios = document.querySelectorAll(
            'input[name="status-filter"]'
        );
        statusRadios.forEach((radio) => {
            radio.addEventListener("change", (evt) => {
                this.#moviesModel.setFilter(evt.target.value);
            });
        });
    }

    #renderMovie(movie, container) {
        const cmp = new MovieItemComponent({ movie: movie });

        cmp.element.dataset.id = movie.id;

        cmp.deleteButton.addEventListener("click", () => {
            this.#moviesModel.deleteMovie(movie.id);
        });

        cmp.editButton.addEventListener("click", () => this.#handleEdit(movie));
        render(cmp, container);
    }

    #handleEdit(movie) {
        const listItem = this.#moviesListComponent
            .getList()
            .querySelector(`[data-id="${movie.id}"]`);

        const editComponent = new MovieEditComponent(movie);
        listItem.innerHTML = "";
        render(editComponent, listItem);

        const form = listItem.querySelector(".movie-edit-form");
        const cancelBtn = listItem.querySelector(".movie-edit__cancel");

        cancelBtn.addEventListener("click", () => {
            this.#handleModelChange();
        });

        form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            const formData = new FormData(form);
            const updated = {
                title: formData.get("title").trim(),
                isWatched: formData.get("status-filter") === "watched",
            };
			  
            this.#moviesModel.updateMovie(movie.id, updated);
        });
    }

    #renderMovieList() {
        const movieListElement = this.#moviesListComponent.getList();

        const currentMovies = this.movies;

        if (currentMovies.length > 0) {
            currentMovies.forEach((movie) =>
                this.#renderMovie(movie, movieListElement)
            );
        }
    }

    #renderBoard() {
        render(
            this.#moviesListComponent,
            this.#boardContainer,
            RenderPosition.AFTEREND
        );
        this.#renderMovieList();
    }

    createMovie() {
        const movieTitle = document.getElementById("movie-title").value.trim();
        const movieStatus = document.getElementById("movie-status").checked;
        if (!movieTitle) return;

        this.#moviesModel.addMovie({
            title: movieTitle,
            isWatched: movieStatus,
        });
        document.getElementById("movie-title").value = "";
        document.getElementById("movie-status").checked;
    }

    get movies() {
        return this.#moviesModel.movies;
    }

    #clearBoard() {
        if (this.#moviesListComponent && this.#moviesListComponent.element) {
            this.#moviesListComponent.element.remove();
        }
    }

    #handleModelChange() {
        this.#clearBoard();
        this.#moviesListComponent = new MovieListComponent();
        this.#renderBoard();
    }
}
