export default class Section {
  constructor(renderer, container) {
    this._renderer = renderer;
    this._container = container;
  }

  addItems(item) {
    this._container.prepend(this._renderer(item));
  }

  clear() {
    this._container.innerHTML = "";
  }

  renderItems(items) {
    this.clear();
    items.reverse().forEach((item) => {
      this.addItems(item);
    });
  }
}