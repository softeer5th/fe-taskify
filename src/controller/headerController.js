export function HeaderController(model, rootElement) {
  const headerView = HeaderView({
    onSortButtonClick: handleSortButtonClick,
    onHistoryButtonClick: handleHistoryButtonClick,
  });
  model.addListener(onModelChanged);
  if (rootElement.children.length < 1) {
    rootElement.appendChild(headerView);
  } else if (rootElement.children[0] !== headerView) {
    rootElement.replaceChild(headerView, rootElement.children[0]);
  }
  render();

  function onModelChanged() {
    render();
  }

  function destroy() {
    model.removeListener(onModelChanged);
  }

  function handleSortButtonClick(event) {
    event.stopPropagation();
    model.toggleOrder();
    console.log("Sort Button Clicked");
  }

  function handleHistoryButtonClick(event) {
    event.stopPropagation();
    model.toggleHistory();
    console.log("History Button Clicked");
  }

  function render() {}
}
