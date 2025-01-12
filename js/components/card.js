export function Card({ card, columnId, onDeleteCard, onUpdateCard }) {
  const container = document.createElement("div");
  container.className = "card";

  const title = document.createElement("p");
  title.textContent = card.title;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    onDeleteCard(columnId, card.id);
  });

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.addEventListener("click", () => {
    const newTitle = prompt("Enter new card title:", card.title);
    if (newTitle) {
      onUpdateCard(columnId, card.id, { ...card, title: newTitle });
    }
  });

  container.appendChild(title);
  container.appendChild(editButton);
  container.appendChild(deleteButton);

  return container;
}
