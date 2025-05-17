import { AbstractComponent } from "../src/framework/view/abstract-component.js";
import { Status, StatusLabel } from "../src/const.js";


function createMovieEditComponentTemplate(movie) {
    return `
	  <form class="movie-edit-form" data-id="${movie.id}">
		<input type="text" name="title" value="${movie.title}" required />
		<fieldset>
                <legend>Статус:</legend>
                <label><input type="radio" name="status-filter" value="true" ${
                    movie.isWatched ? "checked" : ""
                } />${StatusLabel[true]}</label>
                <label><input type="radio" name="status-filter" value="false" ${
                    !movie.isWatched ? "checked" : ""
                } />${StatusLabel[false]}</label>
        </fieldset>
		<button type="submit">Сохранить</button>
		<button type="button" class="movie-edit__cancel">Отмена</button>
	  </form>
	`;
}

export default class MovieEditComponent extends AbstractComponent {
    constructor(movie) {
        super();
        this.movie = movie;
    }

    get template() {
        return createMovieEditComponentTemplate(this.movie);
    }
}
