class Todo {
  #id;

  #columnId;

  constructor({ columnId, id }) {
    this.#id = id;
    this.#columnId = columnId;
  }

  isSameTodo = (id) => this.#id === id;

  getTodoId = () => this.#id;
}

export default Todo;
