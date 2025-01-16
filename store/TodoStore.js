import { ACTION_TYPE } from "../constants/action.js";
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
    this.notify(ACTION_TYPE.add, {
      sectionId,
      newTodo,
      todoList: this.#todoList,
    });
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

    this.notify(ACTION_TYPE.remove, {
      sectionId,
      deletedId,
      todoList: this.#todoList,
    });
    saveLocalStorage(STORAGE_KEY.todoList, this.#todoList);
  }

  update({ sectionId, updatedId, title, content }) {
    this.#todoList = [...this.#todoList].map((section) =>
      section.id === sectionId
        ? {
            ...section,
            items: section.items.map((item) =>
              item.id === updatedId ? { ...item, title, content } : item
            ),
          }
        : section
    );

    const updatedTodo = this.#todoList
      .find((section) => section.id === sectionId)
      .items.find((item) => item.id === updatedId);

    this.notify(ACTION_TYPE.update, {
      sectionId,
      updatedTodo,
      todoList: this.#todoList,
    });
    saveLocalStorage(STORAGE_KEY.todoList, this.#todoList);
  }

  move({ prevSectionId, sectionId, itemId }) {
    const prevColumn = this.#todoList.find(
      (section) => section.id === prevSectionId
    );

    const draggedItem = prevColumn.items.find((item) => item.id === itemId);

    // 드래그 요소를 기존 데이터에서 제거
    const filteredList = this.#todoList.map((section) =>
      section.id === prevSectionId
        ? {
            ...section,
            items: section.items.filter((item) => item.id !== itemId),
          }
        : section
    );

    // 이동한 섹션에 데이터 추가
    this.#todoList = filteredList.map((section) => {
      if (section.id === sectionId && draggedItem) {
        return {
          ...section,
          items: [...section.items, draggedItem],
        };
      }
      return section;
    });

    this.notify(ACTION_TYPE.move, {
      todoList: this.#todoList,
    });
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
