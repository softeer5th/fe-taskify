import { HeaderView } from "./view/headerView.js";
import { ColumnListView } from "./view/columnListView.js";
import { ColumnView } from "./view/columnView.js";
import { TaskView } from "./view/taskView.js";

export function HeaderController(model, rootElement) {
  const header = HeaderView({
    onSortButtonClick: handleSortButtonClick,
    onHistoryButtonClick: handleHistoryButtonClick,
  });
  model.addListener(onModelChanged);
  render();

  function onModelChanged() {
    render();
  }

  function destroy() {
    model.removeListener(onModelChanged);
  }

  function handleSortButtonClick() {
    model.toggleOrder();
    console.log("Sort Button Clicked");
  }

  function handleHistoryButtonClick() {
    model.toggleHistory();
    console.log("History Button Clicked");
  }

  function render() {
    if (rootElement.children.length < 1) {
      rootElement.appendChild(header);
    } else if (rootElement.children[0] !== header) {
      rootElement.replaceChild(header, rootElement.children[0]);
    }
  }
}

export function ColumnListController(model, rootElement) {
  const columnListView = ColumnListView();
  model.addListener(onModelChanged);

  const columns = model.getCurrentDataState().data.columns.map((column) => {
    const columnElement = ColumnView(column);
    return columnElement;
  });
  render();

  function onModelChanged() {
    render();
  }

  function destroy() {
    model.removeListener(onModelChanged);
  }

  function render() {
    if (rootElement.children.length < 2) {
      rootElement.appendChild(columnListView);
    } else if (rootElement.children[1] !== columnListView) {
      rootElement.replaceChild(columnListView, rootElement.children[1]);
    }
  }
}
