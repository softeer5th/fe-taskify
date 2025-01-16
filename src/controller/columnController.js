import icons from "../../asset/icon.js";

import Button from "../component/button.js";

import ColumnListView from "../view/columnListView.js";
import ColumnView from "../view/columnView.js";

export default function ColumnController(model, rootElement) {
  const columnListView = ColumnListView();
  rootElement.appendChild(columnListView);

  const fab = Button({
    className: ["fab", "button-brand"],
    onClick: handleAddColumnButtonClick,
    children: [icons.plus()],
  });
  fab.style.right = "48px";
  fab.style.bottom = "48px";
  rootElement.appendChild(fab);

  model.addListener(onModelChanged);

  render();

  function handleAddColumnButtonClick(event) {
    event.stopPropagation();

    model.addColumn();
    console.log("Add Column Button Clicked");
  }

  function handleColumnTitleClicked(event) {
    event.stopPropagation();
    const column = event.target.closest(".column");
    const columnId = +column.id;

    model.setEditingColumnId(columnId);
  }

  function handleColumnTitleFocusOut(event) {
    event.stopPropagation();
    const column = event.target.closest(".column");
    const columnId = +column.id;

    model.updateColumn(columnId, event.target.value);
  }

  function handleAddTaskButtonClick(event) {
    event.stopPropagation();
    const columnId = +event.target.closest(".column").id;

    model.setEditingTaskColumn(columnId);
  }

  function handleColumnDeleteButtonClicked(event) {
    event.stopPropagation();
    const columnId = +event.target.closest(".column").id;

    model.setModalState("column", { columnId });
  }

  function handleColumnMouseEnter(event) {
    event.stopPropagation();
    const column = event.target.closest(".column");
    const columnId = +column.id;

    if (model.getCurrentState().mouseOverColumnId !== columnId) {
      model.setMouseOverColumnId(columnId);
    }
  }

  function onModelChanged() {
    render();
  }

  function destroy() {
    model.removeListener(onModelChanged);
  }

  function render() {
    // Get data and state from model
    const columnOnModel = model.getCurrentColumnData();
    const tasksOnModel = model.getCurrentTaskData();
    const state = model.getCurrentState();

    // Get ColumnListView and ColumnView
    const columnListView = rootElement.querySelector(".column-list");
    let columnViews = [...columnListView.querySelectorAll(".column")];

    // Remove column that is not on model
    const removedColumn = columnViews.filter((columnView) => !columnOnModel.some((column) => column.id === +columnView.id));
    removedColumn.forEach((columnView) => {
      columnView.remove();
    });
    columnViews = columnViews.filter((columnView) => columnOnModel.some((column) => column.id === +columnView.id));

    // Add column that is not on view
    const addedColumn = columnOnModel.filter((column) => !columnViews.some((columnView) => +columnView.id === column.id));
    addedColumn.forEach((column) => {
      const newColumnView = ColumnView({
        column: column,
        count: tasksOnModel.filter((task) => task.columnId === column.id).length,
        state: state,
        onColumnTitleEvent: handleColumnTitleClicked,
        onAddButtonClicked: handleAddTaskButtonClick,
        onColumnDeleteButtonClicked: handleColumnDeleteButtonClicked,
      });
      newColumnView.addEventListener("mouseenter", handleColumnMouseEnter);
      columnListView.appendChild(newColumnView);
      columnViews.push(newColumnView);
    });

    columnViews.forEach((columnView) => {
      const column = columnOnModel.find((column) => column.id === +columnView.id);
      const columnState = +columnView.id === state.editingColumnId && state.editingTaskId === -1 ? "editing" : "default";
      const newColumnView = ColumnView({
        column: column,
        count: tasksOnModel.filter((task) => task.columnId === +columnView.id).length,
        state: columnState,
        onColumnTitleEvent: columnState === "editing" ? handleColumnTitleFocusOut : handleColumnTitleClicked,
        onAddButtonClicked: handleAddTaskButtonClick,
        onColumnDeleteButtonClicked: handleColumnDeleteButtonClicked,
      });

      columnView.querySelector(".column__title").replaceWith(newColumnView.querySelector(".column__title"));
    });

    const editingColumnTitle = rootElement.querySelector(".column__title-edit")?.querySelector(".column__textarea-title");
    if (editingColumnTitle && state.editingTaskId === -1) {
      editingColumnTitle.focus();
    }
  }

  return {
    destroy,
  };
}
