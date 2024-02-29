import { Cell } from "./Cell";
import { EventManager } from "./EventManager";

export class Field {
  private readonly borderWidth = 1;
  private cellSize = 40;
  private rows = 20;
  private cols = 10;
  private elm: HTMLDivElement;
  private cells: Cell[][] = [];

  private eventManager = EventManager.Instance;

  constructor(cellSize?: number, rows?: number, cols?: number) {
    if (cellSize) this.cellSize = cellSize;
    if (rows) this.rows = rows;
    if (cols) this.cols = cols;

    this.elm = document.createElement("div");

    this.styles();
    this.initField();
  }

  private styles() {
    this.elm.style.position = "relative";
    this.elm.id = "field";
    this.elm.style.width =
      this.cellSize * this.cols + this.borderWidth * this.cols - 2 + "px";
    this.elm.style.height =
      this.cellSize * this.rows + this.borderWidth * this.rows - 2 + "px";
    this.elm.style.display = "flex";
    this.elm.style.flexDirection = "row";
    this.elm.style.flexWrap = "wrap";
  }

  private initField() {
    for (let row = 0; row < this.rows; row += 1) {
      const rowCells: Cell[] = [];

      for (let col = 0; col < this.cols; col += 1) {
        const cell = new Cell([row, col], this.cellSize, this.borderWidth);
        rowCells.push(cell);
        this.elm.appendChild(cell.element);
      }

      this.cells.push(rowCells);
    }
  }

  get element() {
    return this.elm;
  }
}
