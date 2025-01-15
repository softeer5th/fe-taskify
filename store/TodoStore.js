import { STORAGE_KEY } from "../constants/storageKey.js";
import {
  clearLocalStorage,
  loadLocalStorage,
  saveLocalStorage,
} from "../utils/localStorage.js";
import { getRandomId } from "../utils/random.js";
import Observable from "./Observable.js";

class TodoStore extends Observable {
  #todoList = loadLocalStorage(STORAGE_KEY.todoList) || [];

  add({ sectionId, todo }) {
    const newTodo = {
      ...todo,
      id: getRandomId(),
      createdAt: new Date(),
    };

    this.#todoList = [...this.#todoList].map((section) =>
      section.id === sectionId
        ? { ...section, items: [...section.items, newTodo] }
        : section
    );
    this.notify("add", { sectionId, newTodo, todoList: this.#todoList });
    saveLocalStorage(STORAGE_KEY.todoList, this.#todoList);
  }

  remove({ sectionId, deletedId }) {
    this.#todoList = [...this.#todoList].map((section) =>
      section.id === sectionId
        ? {
            ...section,
            items: section.items.filter((item) => item.id !== deletedId),
          }
        : section
    );

    this.notify("remove", { sectionId, deletedId, todoList: this.#todoList });
    saveLocalStorage(STORAGE_KEY.todoList, this.#todoList);
  }

  clear() {
    this.#todoList = [];
    this.notify(this.#todoList);
    clearLocalStorage(STORAGE_KEY.todoList);
  }

  get todoList() {
    return this.#todoList;
  }

  set todoList(data) {
    this.#todoList = data;
  }
}

const todoStore = new TodoStore();

export default todoStore;
