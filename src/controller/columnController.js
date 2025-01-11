import { ColumnView } from "../view/columnView.js";
import { TaskView } from "../view/taskView.js";

export function ColumnController(model, columnId, parent) {
  const column = model.getCurrentDataState().data.column.find((column) => column.id === columnId);
  let tasks = [];

  let columnView = ColumnView({
    column: column,
    state: model.getCurrentDataState().state.editingColumnId === column.columnId ? "" : "default",
    count: tasks.length,
    onAddButtonClicked: handleTaskAddButtonClick,
    onColumnTitleClicked: handleColumnTitleClick,
    onColumnDeleteButtonClicked: handleColumnDeleteButtonClick,
  });
  columnView.addEventListener("mouseenter", handleColumnMouseEnter);
  parent.appendChild(columnView);

  render();

  function handleTaskAddButtonClick(event) {
    event.stopPropagation();
    // if (model.getCurrentDataState().state.editingColumnId) {
    //   return;
    // }

    // model.addTask(column.id, "", "", getUserDeviceType());
    console.log("Task Add Button Clicked");
  }

  function handleColumnTitleClick(event) {
    event.stopPropagation();
    // model.setEditingColumnId(column.id);
    console.log("Column Title Clicked");
  }

  function handleColumnDeleteButtonClick(event) {
    event.stopPropagation();
    // model.removeColumn(column.id);
    // destroy();
    console.log("Column Delete Button Clicked");
  }

  function handleColumnMouseEnter(event) {
    event.stopPropagation();
    // const currentMouseOverColumnId = model.getCurrentDataState().state.mouseOverColumnId;
    // if (currentMouseOverColumnId !== column.id) {
    //   model.setMouseOverColumnId(column.id);
    // }
    console.log("Column Mouse Enter");
  }

  function handleTaskDeleteButtonClick(event) {
    event.stopPropagation();
    // const taskId = parseInt(event.currentTarget.parentElement.parentElement.id);
    // model.removeTask(taskId);
    console.log("Task Delete Button Clicked");
  }

  function handleTaskEditButtonClick(event) {
    event.stopPropagation();
    // const taskId = parseInt(event.currentTarget.parentElement.parentElement.id);
    // model.setEditingTaskId(taskId);
    console.log("Task Edit Button Clicked:", taskId);
  }

  function handleTaskEditCancelButtonClick(event) {
    event.stopPropagation();
    // model.setEditingTaskId("");
    console.log("Task Edit Cancel Button Clicked");
  }

  function handleTaskEditSaveButtonClick(event) {
    event.stopPropagation();
    // const taskElement = parseInt(event.currentTarget.parentElement.parentElement);
    // const taskId = taskElement.id;
    // const taskTitle = taskElement.querySelector(".task__content-title").textContent;
    // const taskDescription = taskElement.querySelector(".task__content-description").textContent;
    // model.editTask(taskId, taskTitle, taskDescription, getUserDeviceType());
    console.log("Task Edit Save Button Clicked");
  }

  function handleTaskClick(event) {
    const taskId = parseInt(event.currentTarget.id);
    // model.setMovingTaskId(taskId);
    console.log("Task Clicked");
  }

  function render() {}

  function onModelChanged() {
    render();
  }

  function destroy() {
    model.removeListener(onModelChanged);
    if (columnView.parentElement) {
      columnView.parentElement.removeChild(columnView);
    }
  }

  function getColumnControllerId() {
    return columnId;
  }

  return {
    destroy,
    getColumnControllerId,
  };
}
