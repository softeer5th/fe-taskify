import Card from "./card.js";

export default function Column({ id, title, tasks }) {
  return `
    <div class="column" data-column-id="${id}">
        <div class="column__header">
            <div class="column__header--text">
                <h4 class="column__header--title">${title}</h4>
                <p class="column__header--count">${tasks.length}</p>
            </div>
            <div class="column__header--button">
                <button class="column__header--button--add">
                    +
                </button>
                <button class="column__header--button--delete">
                    ×
                </button>
            </div>
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
