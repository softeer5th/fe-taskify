import { IMAGE } from "../assets/index.js";
import { STORAGE_KEY } from "../constants/storageKey.js";
import {
  clearLocalStorage,
  loadLocalStorage,
  saveLocalStorage,
} from "../utils/localStorage.js";
import { getRandomId } from "../utils/random.js";
import Observable from "./Observable.js";

class HistoryStore extends Observable {
  #histories = loadLocalStorage(STORAGE_KEY.history) || [];

  constructor() {
    super();
  }

  // ACTION TYPE: add, remove, update, move
  // add: title, action, column
  // remove: title, action
  // update: title, action
  // move: title, action, prevColumn, nextColumn
  action(props) {
    const newHistory = {
      ...props,
      id: getRandomId(),
      date: new Date(),
      nickname: "@멋진삼",
      profileImg: IMAGE.profile,
    };

    this.#histories = [newHistory, ...this.#histories];
    this.notify(this.#histories);
    saveLocalStorage(STORAGE_KEY.history, this.#histories);
  }

  clear() {
    this.#histories = [];
    this.notify(this.#histories);
    clearLocalStorage(STORAGE_KEY.history);
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
