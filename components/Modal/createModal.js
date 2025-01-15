import { createElement } from "../../dom.js";
import loadStyleSheet from "../../utils/loadStyleSheet.js";

loadStyleSheet("/components/Modal/styles.css");

const createModal = ({ title = "", content = "", type = "card" }) => {
  const $modalContainer = document.getElementById("modal-container");
  const $modal = createElement("div", { id: "modal" });

  $modal.innerHTML = /*html*/ `
      <div class="modal__dimmed"></div>
      <div class="modal modal__wrapper shadow-up">
        ${title ? `<p class="modal__title display-bold16">${title}</p>` : ""}
        ${
          content
            ? `<p class="modal__content display-medium16">${content}</p>`
            : ""
        }
        <div class="modal__buttonContainer">
        <button class="cancel__button display-bold14">취소</button>
          <button class="delete__button display-bold14" data-type=${type}>삭제</button>
        </div>
      </div>
    `;

  $modalContainer.appendChild($modal);
};

export default createModal;
