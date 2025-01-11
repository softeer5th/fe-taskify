import { ColumnView } from "../view/columnView.js";
import { TaskView } from "../view/taskView.js";

function ColumnController(model, columnId, parent) {
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
    if (model.getCurrentDataState().state.editingColumnId) {
      return;
    }

    model.addTask(column.id, "", "", getUserDeviceType());
    console.log("Task Add Button Clicked");
  }

  function handleColumnTitleClick(event) {
    event.stopPropagation();
    model.setEditingColumnId(column.id);
    console.log("Column Title Clicked");
  }

  function handleColumnDeleteButtonClick(event) {
    event.stopPropagation();
    model.removeColumn(column.id);
    destroy();
    console.log("Column Delete Button Clicked");
  }

  function handleColumnMouseEnter(event) {
    event.stopPropagation();
    const currentMouseOverColumnId = model.getCurrentDataState().state.mouseOverColumnId;
    if (currentMouseOverColumnId !== column.id) {
      model.setMouseOverColumnId(column.id);
    }
    console.log("Column Mouse Enter");
  }

  function handleTaskDeleteButtonClick(event) {
    event.stopPropagation();
    const taskId = parseInt(event.currentTarget.parentElement.parentElement.id);
    model.removeTask(taskId);
    console.log("Task Delete Button Clicked");
  }

  function handleTaskEditButtonClick(event) {
    event.stopPropagation();
    const taskId = parseInt(event.currentTarget.parentElement.parentElement.id);
    model.setEditingTaskId(taskId);
    console.log("Task Edit Button Clicked:", taskId);
  }

  function handleTaskEditCancelButtonClick(event) {
    event.stopPropagation();
    model.setEditingTaskId("");
    console.log("Task Edit Cancel Button Clicked");
  }

  function handleTaskEditSaveButtonClick(event) {
    event.stopPropagation();
    const taskElement = parseInt(event.currentTarget.parentElement.parentElement);
    const taskId = taskElement.id;
    const taskTitle = taskElement.querySelector(".task__content-title").textContent;
    const taskDescription = taskElement.querySelector(".task__content-description").textContent;
    model.editTask(taskId, taskTitle, taskDescription, getUserDeviceType());
    console.log("Task Edit Save Button Clicked");
  }

  function handleTaskClick(event) {
    const taskId = parseInt(event.currentTarget.id);
    model.setMovingTaskId(taskId);
    console.log("Task Clicked");
  }

  function render() {
    const state = model.getCurrentDataState().state;
    const columnState = state.editingColumnId === columnId ? "editing" : "default";

    const columnOnModel = model.getCurrentDataState().data.column.find((column) => column.id === columnId);
    if (columnState === "editing") {
      const newColumnView = ColumnView({
        column: columnOnModel,
        state: columnState,
        onAddButtonClicked: handleTaskAddButtonClick,
        onColumnTitleClicked: handleColumnTitleClick,
        onColumnDeleteButtonClicked: handleColumnDeleteButtonClick,
      });
      newColumnView.addEventListener("mouseenter", handleColumnMouseEnter);
      parent.replaceChild(newColumnView, columnView);
      columnView = newColumnView;
    }

    const tasksOnModel = model.getCurrentDataState().data.task.filter((task) => task.columnId === columnId);

    const removedTasks = tasks.filter((task) => !tasksOnModel.some((t) => t.id === task.id));
    removedTasks.forEach((task) => {
      columnView.removeChild(task);
    });
    tasks = tasks.filter((task) => !removedTasks.some((t) => t.id === task.id));

    const addedColumns = tasksOnModel.filter((task) => !tasks.some((t) => t.id === task.id));
    addedColumns.forEach((task) => {
      const taskState = state.editingTaskId === task.id ? "editing" : state.movingTaskId === task.id ? "moving" : "default";
      const taskView = TaskView({
        task: task,
        state: taskState,
        onTaskDeleteButtonClick: handleTaskDeleteButtonClick,
        onTaskEditButtonClick: handleTaskEditButtonClick,
        onTaskEditCancelButtonClick: handleTaskEditCancelButtonClick,
        onTaskEditSaveButtonClick: handleTaskEditSaveButtonClick,
        onTaskClick: handleTaskClick,
      });
      taskView.addEventListener("mousedown", handleTaskClick);
      tasks.push(taskView);
      columnView.appendChild(taskView);
    });
  }

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
