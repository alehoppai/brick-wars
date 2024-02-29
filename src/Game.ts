import { Field } from "./Field";
import { EventManager, Events } from "./EventManager";

export class Game {
  private field: Field;
  private turn: 1 | 2 = 1;
  private eventManager = EventManager.Instance;

  constructor() {
    this.field = new Field();
    document.getElementById("app")?.appendChild(this.field.element);

    this.eventManager.dispatch(Events.PlayerChanged, 1);
    this.eventManager.dispatch(Events.SetPlayerTurnPoints, 6);
  }
}
