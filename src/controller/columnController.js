import Model from "../model.js";

import ColumnListView from "../view/columnListView.js";
import ColumnView from "../view/columnView.js";

export default function ColumnController(model = new Model(), rootElement = document.getElementById("root")) {
  const columnListView = ColumnListView();
  rootElement.appendChild(columnListView);

  let columnViews = [];

  model.addListener(onModelChanged);

  render();

  function handleAddColumnButtonClick(event) {
    event.stopPropagation();

    console.log("Add Column Button Clicked");
  }

  function handleColumnTitleClicked(event) {
    event.stopPropagation();
    const column = event.target.closest(".column");
    const columnId = parseInt(column.id);

    model.setEditingColumnId(columnId);
  }

  function handleColumnTitleFocusOut(event) {
    event.stopPropagation();
    const column = event.target.closest(".column");
    const columnId = parseInt(column.id);

    console.log(event.target.value);
    model.updateColumn(columnId, event.target.value);
  }

  function handleAddTaskButtonClick(event) {
    event.stopPropagation();
    const columnId = parseInt(event.target.closest(".column").id);

    model.setCreatingTaskColumn(columnId);
  }

  function handleColumnDeleteButtonClicked(event) {
    event.stopPropagation();
    const columnId = parseInt(event.target.closest(".column").id);
    model.removeColumn(columnId);
  }

  function onModelChanged() {
    render();
  }

  function destroy() {
    model.removeListener(onModelChanged);
  }

  function render() {
    const columnOnModel = model.getCurrentColumnData();
    const tasksOnModel = model.getCurrentTaskData();
    const state = model.getCurrentState();

    const removedColumn = columnViews.filter((columnView) => !columnOnModel.some((column) => column.id === parseInt(columnView.id)));
    removedColumn.forEach((columnView) => {
      columnView.remove();
    });
    columnViews = columnViews.filter((columnView) => columnOnModel.some((column) => column.id === parseInt(columnView.id)));

    columnOnModel.forEach((column) => {
      const columnView = columnViews.find((columnView) => parseInt(columnView.id) === column.id);
      const columnState = state.editingColumnId === column.id && state.editingTaskId === -1 ? "editing" : "default";

      if (columnView) {
        const newColumnHeader = ColumnView({
          column: column,
          count: tasksOnModel.filter((task) => task.columnId === column.id).length,
          state: columnState,
          onColumnTitleEvent: columnState === "editing" ? handleColumnTitleFocusOut : handleColumnTitleClicked,
          onAddButtonClicked: handleAddTaskButtonClick,
          onColumnDeleteButtonClicked: handleColumnDeleteButtonClicked,
        }).querySelector(`${columnState === "editing" ? ".column__title-edit" : ".column__title"}`);

        columnView.children[0].replaceWith(newColumnHeader);
      } else {
        const newColumnView = ColumnView({
          column: column,
          count: tasksOnModel.filter((task) => task.columnId === column.id).length,
          state: state,
          onColumnTitleEvent: columnState === "editing" ? handleColumnTitleFocusOut : handleColumnTitleClicked,
          onAddButtonClicked: handleAddTaskButtonClick,
          onColumnDeleteButtonClicked: handleColumnDeleteButtonClicked,
        });
        columnListView.appendChild(newColumnView);
        columnViews.push(newColumnView);
      }
    });
  }

  return {
    destroy,
  };
}
