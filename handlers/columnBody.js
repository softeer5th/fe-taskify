export const handleDragStart = (e) => {
  const $columnItem = e.target.closest(".column__item");
  const prevSectionId = $columnItem.closest(".column__container").id;
  e.dataTransfer.setData("text/prevSectionId", prevSectionId);
  $columnItem.classList.add("dragging");
};

export const handleDragEnd = (e) => {
  const $columnItem = e.target.closest(".column__item");
  $columnItem.classList.remove("dragging");
};
