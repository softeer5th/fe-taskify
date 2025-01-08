export default function History({ histories }) {
  const history = document.createElement("div");
  history.className = "history";

  const header = document.createElement("div");
  header.className = "history__header";

  const headerTitle = document.createElement("h4");
  headerTitle.textContent = "사용자 활동 기록";

  const closeButton = document.createElement("button");
  closeButton.className = "history__header__button--close";
  closeButton.textContent = "× 닫기";

  header.appendChild(headerTitle);
  header.appendChild(closeButton);

  const body = document.createElement("div");
  body.className = "history__body";

  histories.forEach((history) => {
    const item = document.createElement("div");
    item.className = "history__body__item";

    const title = document.createElement("h5");
    title.textContent = history.title;

    const description = document.createElement("p");
    description.textContent = history.description;

    item.appendChild(title);
    item.appendChild(description);

    body.appendChild(item);
  });

  history.appendChild(header);
  history.appendChild(body);

  return history;
}
