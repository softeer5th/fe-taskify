import HeaderController from "./headerController.js";
import ColumnController from "./columnController.js";
import TaskController from "./taskController.js";

export default function MainController(model, rootElement) {
  const headerController = HeaderController(model, rootElement);
  const columnController = ColumnController(model, rootElement);
  const taskController = TaskController(model, rootElement);

  function destroy() {
    [headerController, columnController, taskController].forEach((controller) => {
      controller.destroy();
    });
  }

  return {
    destroy,
  };
}
