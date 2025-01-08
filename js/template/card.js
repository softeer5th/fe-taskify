const cardTemplate = (columnIndex, cardIndex, cardData) => {
    const { title, content, author } = cardData;
    const id = `card-${columnIndex}-${cardIndex}`
    return `<li id=${id} class="card-template">
                <div>
                    ${title}
                </div>
                <div>
                    ${content}
                </div>
                <div>
                    ${author}
                </div>
            </li>
            `
}

export const createCardHTML = (columnIndex, cardIndex, cardData) => cardTemplate(columnIndex, cardIndex, cardData);

export const createCardHTMLs = (columnIndex, cardDataArray) => cardDataArray.map((card, index) => cardTemplate(columnIndex, index, card)).join('');