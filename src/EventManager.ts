type ActionFn = (...args: unknown[]) => unknown;

export enum Events {
  CellClicked = "cell_clicked",
  CellHovered = "cell_hovered",
  PlayerChanged = "player_changed",
  SetPlayerTurnPoints = "set_player_turn_points",
}

export class EventManager {
  private static _instance: EventManager;

  private constructor() {}

  public static get Instance() {
    if (!EventManager._instance) EventManager._instance = new EventManager();

    return this._instance;
  }

  private events: Map<Events, ActionFn> = new Map();

  subscribe(key: Events, action: ActionFn) {
    this.events.set(key, action);
  }
  unsubscribe(key: Events) {
    if (!this.events.has(key)) return;
    this.events.delete(key);
  }
  dispatch<T>(key: Events, data: T) {
    if (!this.events.has(key)) return;
    const action = this.events.get(key)!;

    action(data);
  }
}
