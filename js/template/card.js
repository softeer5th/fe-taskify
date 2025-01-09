
import { attachCommandEvent, attachViewEvent } from "../event/card.js";

// 일반 카드 템플릿
const cardTemplate = (cardData, columnIndex = null, cardIndex = null, originalId = undefined) => {
    const { title, content, author } = cardData;
    const id = originalId ? originalId : `card-${columnIndex}-${cardIndex}`
    const element = document.createElement("li");
    element.className = "card-view-template"
    element.id = id;
    element.innerHTML = `
            <div class="card-view-text">
                <div class="display-bold14 card-title">
                    ${title}
                </div>
                <div class="display-medium14 card-content">
                    ${content}
                </div>
                <div class="display-medium14 card-author">
                    author by ${author}
                </div>
            </div>
            <div class="card-view-buttons">
                <button class="normal-button card-closed-button">
                    <img src="./assets/icons/normal/closed.svg"></img>
                </button>
                <button class="normal-button card-edit-button">
                    <img src="./assets/icons/normal/edit.svg"</img>
                </button>
            </div>
            `
    return element;
}
// 추가 / 수정할 때 사용하는 템플릿
const createCardTemplate = (cardData = null) => {
    const element = document.createElement("li");
    element.className = "card-template"
    element.innerHTML = !cardData ? `
                <input type="text" class="display-bold14 card-title" placeholder="제목을 입력하세요">
                </input>
                <textarea type="text"
                rows="1"
                class="display-medium14 card-content" placeholder="내용을 입력하세요"
                required></textarea>
                <div class="card-button-container">
                    <button class="display-bold14 card-button-cancel">
                        취소
                    </button>
                    <button class="display-bold14 card-button-submit" disabled>
                        등록
                    </button>
                </div>
            ` : `
                <input type="text" class="display-bold14 card-title" value=${cardData.title} placeholder="제목을 입력하세요">
                </input>
                <textarea type="text"
                    rows="1"
                    class="display-medium14 card-content"
                    placeholder="내용을 입력하세요" 
                required>${cardData.content}</textarea>
                <div class="card-button-container">
                    <button class="display-bold14 card-button-cancel">
                        취소
                    </button>
                    <button class="display-bold14 card-button-submit">
                        수정
                    </button>
                </div>
            `
    return element;
}

const createCardHTML = (cardData = null) => createCardTemplate(cardData);
export const createCardElement = (index) => attachCommandEvent(createCardHTML(), index);
export const saveCardHTML = (cardData, columnIndex, cardIndex) => attachViewEvent(cardTemplate(cardData, columnIndex, cardIndex));
export const cancelCardHTML = (cardData) => attachViewEvent(cardTemplate(cardData));
export const editCardHTML = (cardData, index) => attachCommandEvent(createCardHTML(cardData), index, true, cardData);
export const loadCardHTMLs = (columnIndex, cardDataArray) => cardDataArray.map((card, index) => cardTemplate(columnIndex, index, card)).join('');
