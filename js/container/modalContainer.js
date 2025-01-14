import { ModalText } from "../components/modal/modalText.js";
import { ModalButtonContainer } from "./modal/modalButtonContainer.js";

export const ModalContainer = (text, onDelete, setState) => {

    const modalBackground = document.createElement("div");
    modalBackground.className = "modal-background";

    const modal = document.createElement("div");
    modal.className = "modal-container";

    modal.appendChild(ModalText(text));
    modal.appendChild(ModalButtonContainer(onDelete, setState));
    modalBackground.appendChild(modal);

    return modalBackground;
}