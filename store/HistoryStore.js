import { IMAGE } from "../assets/index.js";
import { getRandomId } from "../utils/random.js";
import Observable from "./Observable.js";

class HistoryStore extends Observable {
  #histories = [];

  constructor() {
    super();
  }

  addHistory({ title, column }) {
    const newHistory = {
      id: getRandomId(),
      action: "add",
      date: new Date(),
      nickname: "@멋진삼",
      profileImg: IMAGE.profile,
      title,
      column,
    };

    this.#histories = [newHistory, ...this.#histories];
    this.notify(this.#histories);
  }

  clear() {
    this.#histories = [];
    this.notify(this.#histories);
  }

  get histories() {
    return this.#histories;
  }

  set histories(data) {
    this.#histories = data;
  }
}

const historyStore = new HistoryStore();

export default historyStore;
