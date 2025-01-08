import Card from "./card.js";

export default function Column({ id, title, tasks }, addCard = false) {
  const column = document.createElement("div");
  column.className = "column";
  column.dataset.columnId = id;

  const header = document.createElement("div");
  header.className = "column__header";

  const headerText = document.createElement("div");
  headerText.className = "column__header--text";

  const headerTitle = document.createElement("h4");
  headerTitle.className = "column__header--title";
  headerTitle.textContent = title;

  const headerCount = document.createElement("p");
  headerCount.className = "column__header--count";
  headerCount.textContent = tasks.length;

  headerText.appendChild(headerTitle);
  headerText.appendChild(headerCount);

  const headerButton = document.createElement("div");
  headerButton.className = "column__header--button";

  const addButton = document.createElement("button");
  addButton.className = "column__header--button--add";
  addButton.textContent = "+";

  const deleteButton = document.createElement("button");
  deleteButton.className = "column__header--button--delete";
  deleteButton.textContent = "×";

  headerButton.appendChild(addButton);
  headerButton.appendChild(deleteButton);

  header.appendChild(headerText);
  header.appendChild(headerButton);

  const body = document.createElement("div");
  body.className = "column__body";

  if (addCard) {
    const editableCard = Card({}, true);
    body.appendChild(editableCard);
  }

  tasks.forEach((task) => {
    body.appendChild(Card(task));
  });

  column.appendChild(header);
  column.appendChild(body);

  return column;
}
