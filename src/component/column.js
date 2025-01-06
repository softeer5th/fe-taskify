import Card from "./card.js";

export default function Column({ id, title, tasks }) {
  return `<div class="column" data-column-id="${id}">
        <div class="column__header">
            <h4>${title}</h4>
            <button class="column__header__button--add">
                +
            </button>
            <button class="column__header__button--delete">
                X
            </button>
        </div>
        <div class="column__body">
            ${tasks
              .map(
                (task) => `
                ${Card()}
                `
              )
              .join("")}
        </div>
    </div>`;
}
