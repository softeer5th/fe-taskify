import { createCardHTMLs } from "./card.js"

const columnTemplate = (column, index) => {
    const { title, contentNum, cards } = column;
    return `<div class="column-template">
                <div class="column-header">
                    <div class="column-header-left">
                        <div class="column-header-title">${title}</div>
                        <div class="column-header-content-num">${contentNum}</div>
                    </div>
                    <div>
                        <button class="column-header-plus-button">
                            <img src="./assets/icons/normal/plus.svg"></img>
                        </button>
                        <button class="column-header-content-delete-button">
                            <img src="./assets/icons/normal/closed.svg"></img>
                        </button>
                    </div>
                </div>
                <ul id=${"list-" + index}>
                    ${createCardHTMLs(index, cards)}
                </ul>
            </div>`
}

export const createDefaultColumnHTML = (columns) => columns.map((column, index) => columnTemplate(column, index)).join('')