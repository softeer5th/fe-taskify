import { loadCardHTMLs } from "./card.js"

const columnTemplate = (column, index) => {
    const { title, cards } = column;
    const cardCount = cards.length;
    return `<div class="column-template">
                <div class="column-header">
                    <div class="column-header-left">
                        <div class="column-header-title">${title}</div>
                        <div class="column-header-content-num">${cardCount}</div>
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
                <ol id=${"list-" + index} class="column-card-list">
                    ${loadCardHTMLs(index, cards)}
                </ol>
            </div>`
}

export const createDefaultColumnHTML = (columns) => columns.map((column, index) => columnTemplate(column, index)).join('')