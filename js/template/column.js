import { loadCardHTMLs } from "./card.js"

const columnTemplate = (column) => {
    const { title, cards, id, contentCount } = column;
    return `<div class="column-template">
                <div class="column-header">
                    <div class="column-header-left">
                        <div class="column-header-title">${title}</div>
                        <div class="column-header-content-num"><div>${contentCount}</div></div>
                    </div>
                    <div>
                        <button class="column-header-plus-button normal-button">
                            <img src="./assets/icons/normal/plus.svg"></img>
                        </button>
                        <button class="column-header-content-delete-button normal-button">
                            <img src="./assets/icons/normal/closed.svg"></img>
                        </button>
                    </div>
                </div>
                <ol id=${"list-" + id} class="column-card-list">
                    ${loadCardHTMLs(id, cards)}
                </ol>
            </div>`
}

export const createDefaultColumnHTML = (columns) => {
    let mainContainer = document.querySelector(".main-container");
    const innerHTML = columns.map((column) => columnTemplate(column)).join('')
    mainContainer.innerHTML = innerHTML;
    return mainContainer.querySelectorAll(".column-template");
}