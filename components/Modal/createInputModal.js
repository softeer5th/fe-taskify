import { createElement } from "../../dom.js";

const createInputModal = () => {
  const $modalContainer = document.getElementById("modal-container");
  const $modal = createElement("div", { id: "modal" });

  $modal.innerHTML = /*html*/ `
      <div class="modal__dimmed"></div>
      <div class="modal modal__wrapper shadow-up">
        <span class="modal__title display-bold16">칼럼 추가</span>
        <input class="modal__titleInput display-medium16" placeholder="추가할 칼럼 이름을 입력하세요"/>
        <div class="modal__buttonContainer">
        <button class="cancel__button display-bold14">취소</button>
          <button class="add__button display-bold14">추가</button>
        </div>
      </div>
    `;

  $modalContainer.appendChild($modal);
};

export default createInputModal;
