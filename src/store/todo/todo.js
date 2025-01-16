class Todo {
  #id;

  #columnId;

  constructor({ columnId, id }) {
    this.#id = id;
    this.#columnId = columnId;
  }

  isSameTodo(id) {
    return this.#id === id;
  }

  getTodo() {
    return {
      id: this.#id,
      columnId: this.#columnId,
    };
  }
}

export default Todo;
