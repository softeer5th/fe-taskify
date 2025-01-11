import { ColumnController } from "./columnController.js";
import { ColumnListView } from "../view/columnListView.js";

export function ColumnListController(model, rootElement) {
  const columnListView = ColumnListView();
  let columns = model.getCurrentDataState().data.column.map((column) => {
    return ColumnController(model, column.id, columnListView);
  });
  if (rootElement.children.length < 2) {
    rootElement.appendChild(columnListView);
  } else if (rootElement.children[1] !== columnListView) {
    rootElement.replaceChild(columnListView, rootElement.children[1]);
  }
  model.addListener(onModelChanged);

  render();

  function onModelChanged() {
    render();
  }

  function destroy() {
    model.removeListener(onModelChanged);
  }

  function handleAddColumnButtonClick(event) {
    // TODO: Implement method when "add column" button is implemented
    event.stopPropagation();
    model.addColumn("New Column");
  }

  function render() {
    const modelData = model.getCurrentDataState();
    const columnsOfModel = modelData.data.column;
    const state = modelData.state;

    // Add columns
    const addedColumns = columnsOfModel.filter((column) => !columns.some((c) => c.getColumnControllerId() === column.id));
    addedColumns.forEach((column) => {
      const columnController = ColumnController(model, column.id, columnListView);
      columns.push(columnController);
    });

    // Remove columns
    const removedColumns = columns.filter((column) => columns.some((c) => c.getColumnControllerId() === column.id));
    removedColumns.forEach((column) => {
      column.destroy();
    });
    columns = columns.filter((column) => !removedColumns.some((c) => c.getColumnControllerId() === column.id));
  }
}
