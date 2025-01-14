import { ModalCancelButton } from "../../components/modal/modalCancelButton.js";
import { ModalSubmitButton } from "../../components/modal/modalSubmitButton.js";

export const ModalButtonContainer = (onDelete, setState) => {
    const modalButtonContainer = document.createElement("div");
    modalButtonContainer.className = "modal-button-container"

    modalButtonContainer.appendChild(ModalCancelButton(setState));
    modalButtonContainer.appendChild(ModalSubmitButton(onDelete));

    return modalButtonContainer;
}