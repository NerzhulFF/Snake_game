export default class Field {
  constructor(fieldElement, CELLS_QUANTITY) {
    this.fieldElement = fieldElement;
    this.CELLS_QUANTITY = CELLS_QUANTITY;
  }

  #x;
  #y;

  get fieldSize() {
    return this.fieldElement.getBoundingClientRect().height;
  }

  get cellLength() {
    return this.fieldSize / this.CELLS_QUANTITY;
  }

  initializate(statement) {
    this.#x = this.#getRandomPosition(statement);
    this.#y = this.#getRandomPosition(statement);
    return [this.#x, this.#y];
  }

  #getRandomPosition() {
    return Math.floor((this.CELLS_QUANTITY - 2) * Math.random()) + 1;
  }
}
