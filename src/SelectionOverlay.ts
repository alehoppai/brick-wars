import { EventManager, Events } from "./EventManager";

type Color = "red" | "blue";
type Player = 1 | 2;
type Selection = {
  x: number;
  y: number;
};

export class SelectionOverlay {
  private eventManager = EventManager.Instance;
  private player: Player | null = null;
  private selectionStart: [number, number] | null = null;
  private selectionEnd: [number, number] | null = null;
  private readonly colors: Color[] = ["red", "blue"];
  private color: Color | null = null;
  private turnPoints: number = 0;
  private elm: HTMLDivElement;

  constructor() {
    this.eventManager.subscribe(Events.CellClicked, (data) =>
      this.handleSelection(data as Selection)
    );
    this.eventManager.subscribe(Events.PlayerChanged, (data) => {
      this.player = data as Player;
      this.color = this.colors[this.player - 1];
      console.log("player changed", this.player, this.color);
    });
    this.eventManager.subscribe(Events.SetPlayerTurnPoints, (data) => {
      this.turnPoints = data as number;
      console.log("turn points upadted", this.turnPoints);
    });
    this.eventManager.subscribe(Events.CellHovered, (data) => {
      if (!this.selectionStart) return;
      console.log("hovered cell", data);
    });

    this.elm = document.createElement("div");
    this.elm.id = "selection-overlay";
    this.elm.style.position = "absolute";
    this.elm.style.top = "0";
    this.elm.style.left = "0";
    document.getElementById("field")?.prepend(this.elm);
  }

  handleSelection({ x, y }: Selection) {
    if (!this.selectionStart) {
      this.selectionStart = [x, y];
    } else {
    }

    console.log(this.selectionStart, this.player);
  }
}
