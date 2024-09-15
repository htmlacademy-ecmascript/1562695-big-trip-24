import AbstractView from '../framework/view/abstract-view.js';

function createEmptyListTemplate(text){
    return `<p class="trip-events__msg">${text}</p>`;
}

export default class EmptyListView extends AbstractView{
    #text = null;
    constructor(text){
        super();
        this.#text=text;
    }

    get template() {
      return createEmptyListTemplate(this.#text);
    }
  }
  