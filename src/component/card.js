export default function Card({ id, title, description, device }) {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.cardId = id;

  const content = document.createElement("div");
  content.className = "card__content";

  const contentTitle = document.createElement("div");
  contentTitle.className = "card__content--title";
  contentTitle.textContent = title;

  const contentDescription = document.createElement("div");
  contentDescription.className = "card__content--description";
  contentDescription.textContent = description;

  const contentDevice = document.createElement("div");
  contentDevice.className = "card__content--device";

  const deviceText = document.createElement("span");
  deviceText.textContent = `author by ${device}`;

  contentDevice.appendChild(deviceText);

  content.appendChild(contentTitle);
  content.appendChild(contentDescription);
  content.appendChild(contentDevice);

  const button = document.createElement("div");
  button.className = "card__button";

  const deleteButton = document.createElement("button");
  deleteButton.className = "card__button--delete";
  deleteButton.textContent = "×";

  const editButton = document.createElement("button");
  editButton.className = "card__button--edit";
  editButton.innerHTML = `<svg width="100%" height="100%" data-slot="icon" fill="none" stroke-width="1.5" stroke="#A0A3BD" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"></path>
  </svg>`;
  button.appendChild(deleteButton);
  button.appendChild(editButton);

  card.appendChild(content);
  card.appendChild(button);

  return card;
}
