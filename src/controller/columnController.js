import { ColumnView } from "../view/columnView.js";
import { TaskView } from "../view/taskView.js";

export function ColumnController(model, columnId, parent) {
  const column = model.getCurrentDataState().data.column.find((column) => column.id === columnId);
  let tasks = [];

  let columnView = ColumnView({
    column: column,
    state: "default",
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

    const state = model.getCurrentDataState().state;
    if (state.editingTaskId !== -1) return;
    const newTask = TaskView({
      task: {
        id: "",
        name: "",
        description: "",
        createdAt: Date.now(),
        device: "",
        columnId: columnId,
      },
      state: "editing",
      onFirstButtonClicked: handleTaskEditCancelButtonClick,
      onSecondButtonClicked: handleTaskEditSaveButtonClick,
    });

    if (tasks.length === 0) {
      columnView.appendChild(newTask);
    } else {
      columnView.insertBefore(newTask, columnView.children[1]);
    }
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
    const currentMouseOverColumnId = model.getCurrentDataState().state.mouseOverColumnId;
    if (currentMouseOverColumnId !== column.id) {
      model.setMouseOverColumnId(column.id);
    }
  }

  function handleTaskDeleteButtonClick(event) {
    event.stopPropagation();
    const taskId = parseInt(event.currentTarget.parentElement.parentElement.id);
    // model.removeTask(taskId);
    console.log("Task Delete Button Clicked:", taskId);
  }

  function handleTaskEditButtonClick(event) {
    event.stopPropagation();
    const taskId = parseInt(event.currentTarget.parentElement.parentElement.id);
    // model.setEditingTaskId(taskId);
    console.log("Task Edit Button Clicked:", taskId);
  }

  function handleTaskEditCancelButtonClick(event) {
    event.stopPropagation();
    event.preventDefault();

    const editingTaskId = model.getCurrentDataState().state.editingTaskId;
    if (editingTaskId === -1) {
      columnView.removeChild(columnView.children[1]);
    } else {
      model.setEditingTaskId(-1);
    }
    console.log("Task Edit Cancel Button Clicked");
  }

  function handleTaskEditSaveButtonClick(event) {
    event.stopPropagation();
    event.preventDefault();

    const taskId = parseInt(event.currentTarget.parentElement.parentElement.id);
    console.log("Task Edit Save Button Clicked");
  }

  function handleTaskClick(event) {
    const taskId = parseInt(event.currentTarget.id);
    // model.setMovingTaskId(taskId);
    console.log("Task Clicked");
  }

  function render() {
    const currentDataState = model.getCurrentDataState();
    const state = currentDataState.state;
    const columnOnModel = currentDataState.data.column.find((column) => column.id === columnId);
    if (!columnOnModel) {
      destroy();
      return;
    }

    const originTaskNumber = tasks.length;
    const columnTasks = currentDataState.data.task.filter((task) => task.columnId === columnId);
    tasks = columnTasks.map((task) => {
      const isEditing = state.editingTaskId === task.id;
      const isMoving = state.movingTaskId === task.id;
      const taskView = TaskView({
        task: task,
        state: isEditing ? "edit" : isMoving ? "moving" : "default",
        onFirstButtonClicked: isEditing ? handleTaskEditCancelButtonClick : handleTaskDeleteButtonClick,
        onSecondButtonClicked: isEditing ? handleTaskEditSaveButtonClick : handleTaskEditButtonClick,
      });
      taskView.addEventListener("mousedown", handleTaskClick);
      return taskView;
    });

    if (originTaskNumber !== tasks.length || JSON.stringify(columnOnModel) !== JSON.stringify(column) || state.editingColumnId === columnId) {
      if (columnView.parentElement) {
        columnView.parentElement.removeChild(columnView);
      }
      columnView = ColumnView({
        column: columnOnModel,
        state: state.editingColumnId === columnId ? "edit" : "default",
        count: tasks.length,
        onAddButtonClicked: handleTaskAddButtonClick,
        onColumnTitleClicked: handleColumnTitleClick,
        onColumnDeleteButtonClicked: handleColumnDeleteButtonClick,
      });
      columnView.addEventListener("mouseenter", handleColumnMouseEnter);

      parent.appendChild(columnView);
    }

    tasks.forEach((task) => {
      columnView.appendChild(task);
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
