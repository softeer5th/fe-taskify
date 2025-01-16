import HeaderView from "../view/headerView.js";

export default function HeaderController(model, rootElement) {
  const headerView = HeaderView({
    onClickSortButton: handleClickSortButton,
    onClickHistoryButton: handleClickHistoryButton,
  });

  if (rootElement.children.length < 1) {
    rootElement.appendChild(headerView);
  } else if (rootElement.children[0] !== headerView) {
    rootElement.replaceChild(headerView, rootElement.children[0]);
  }

  // Event Handlers

  function handleClickSortButton(event) {
    event.stopPropagation();
    model.toggleOrder();
  }

  function handleClickHistoryButton(event) {
    event.stopPropagation();
    model.toggleHistory();
  }

  function destroy() {
    model.removeListener(render);
  }

  return {
    destroy,
  };
}
