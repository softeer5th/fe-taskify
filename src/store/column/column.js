class Column {
  #name;

  #id;

  constructor({ id, name }) {
    this.#id = id;
    this.#name = name;
  }

  getColumn() {
    return {
      id: this.#id,
      name: this.#name,
    };
  }
}

export default Column;
