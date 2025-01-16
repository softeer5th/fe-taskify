import TaskItem from "../component/taskItem.js";
import EditTaskItem from "../component/editTaskItem.js";

export default function TaskView({ task, state, onClickFirstButton, onClickSecondButton }) {
  if (state === "editing") {
    return EditTaskItem({
      task,
      onClickCancelButton: onClickFirstButton,
      onClickSaveButton: onClickSecondButton,
    });
  } else {
    return TaskItem({
      task,
      onDeleteButtonClick: onClickFirstButton,
      onEditButtonClick: onClickSecondButton,
    });
  }
}
