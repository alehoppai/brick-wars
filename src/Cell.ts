import { EventManager, Events } from "./EventManager";

export class Cell {
  private cellSize = 40;
  private col = 0;
  private row = 0;
  private borderWidth: number;
  private player: 0 | 1 | null = null;
  private elm: HTMLDivElement;
  private eventManager = EventManager.Instance;

  constructor(
    [row, col]: [number, number],
    cellSize: number,
    borderWidth: number
  ) {
    this.col = col;
    this.row = row;
    this.borderWidth = borderWidth;
    this.elm = document.createElement("div");
    this.elm.setAttribute("data-pos", `${this.row}-${this.col}`);
    this.elm.classList.add("cell-placeholder");
    this.elm.onclick = this.onClickElm.bind(this);
    this.cellSize = cellSize;

    this.styles();
  }

  private styles() {
    const cellSize = this.cellSize + "px";
    const borderWidth = this.borderWidth + "px";

    this.elm.style.width = cellSize;
    this.elm.style.height = cellSize;

    this.elm.style.cursor = "pointer";

    this.elm.onmouseenter = () => {
      this.elm.style.backgroundColor = "#a1a1a1";
      this.eventManager.dispatch(Events.CellHovered, {
        x: this.col,
        y: this.col,
      });
    };
    this.elm.onmouseleave = () => {
      this.elm.style.backgroundColor = "transparent";
    };

    this.elm.style.borderStyle = "solid";
    this.elm.style.borderColor = "#999999";
    this.elm.style.borderRightWidth = borderWidth;
    this.elm.style.borderBottomWidth = borderWidth;

    this.col === 0
      ? (this.elm.style.borderLeftWidth = borderWidth)
      : (this.elm.style.borderLeft = "none");
    this.row === 0
      ? (this.elm.style.borderTopWidth = borderWidth)
      : (this.elm.style.borderTop = "none");
  }

  private onClickElm() {
    if (this.player != null) {
      console.log("Can't expand from here", this.row, this.col);
      return;
    }

    this.eventManager.dispatch(Events.CellClicked, {
      x: this.col,
      y: this.row,
    });
  }

  get element() {
    return this.elm;
  }
}
