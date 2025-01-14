import { attachCommandEvent, attachViewEvent } from "../event/card.js";
import { columnStore } from "../store/column.js";

const { getCardWithId } = columnStore();

// 일반 카드 템플릿
const cardTemplate = (columnId, cardId) => {
    const cardData = getCardWithId(columnId, cardId);
    console.log(cardData)
    const { title, content, author } = cardData;
    const id = `card-${columnId}-${cardId}`
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
const createCardTemplate = (columnId = null, cardId = null) => {
    const element = document.createElement("li");
    const card = getCardWithId(columnId, cardId);
    element.className = "card-template"
    if (!card) {
        element.innerHTML = `
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
            `
        return element;
    }
    element.innerHTML = `
        <input type="text" class="display-bold14 card-title" value=${title} placeholder="제목을 입력하세요">
        </input>
        <textarea type="text"
            rows="1"
            class="display-medium14 card-content"
            placeholder="내용을 입력하세요" 
        required>${content}</textarea>
        <div class="card-button-container edit">
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

const createCardHTML = (columnId = null, cardId = null) => createCardTemplate(columnId, cardId);
export const createCardElement = () => attachCommandEvent(createCardHTML());
export const saveCardHTML = (columnId, cardId) => attachViewEvent(cardTemplate(columnId, cardId));
export const cancelCardHTML = (columnId, cardId) => attachViewEvent(cardTemplate(columnId, cardId));
export const editCardHTML = (columnId, cardId) => attachCommandEvent(createCardHTML(columnId, cardId), getCardWithId(columnId, cardId));
export const loadCardHTMLs = (columnIndex, cardDataArray) => cardDataArray.map((card, index) => cardTemplate(columnIndex, index, card)).join('');
