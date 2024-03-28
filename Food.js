import Snake from "./Snake.js";

export default class Food extends Snake {
  constructor(startX, startY, fieldElement, CELLS_QUANTITY) {
    super(startX, startY, fieldElement, CELLS_QUANTITY);
  }
}
