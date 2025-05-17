import { AbstractComponent } from "../src/framework/view/abstract-component.js";

function createMovieListComponentTemplate() {
    return `<div class="movie-list">
            <h2>Список Фильмов</h2>
            <ul id="movie-list" class="card-container">
            
            </ul>
        </div>`;
}

export default class MovieListComponent extends AbstractComponent {
    constructor() {
        super();
    }
    get template() {
        return createMovieListComponentTemplate();
    }
    getList() {
        if (!this.element) {
            this.element = createElement(this.template);
        }

        return document.getElementById("movie-list");
    }
}
