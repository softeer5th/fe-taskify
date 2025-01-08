export function createBody() {
  return {
    element: document.createElement("div"),

    render() {
      this.element.className = "body";
    },

    mount(parent) {
      this.render();
      parent.appendChild(this.element);
    },

    unmount() {
      this.element.remove();
    },

    addColumn(Column) {
      this.element.appendChild(Column);
    },

    deleteColumn(columnIdx) {
      this.element.removeChild(this.element.children[columnIdx]);
    },
  };
}
