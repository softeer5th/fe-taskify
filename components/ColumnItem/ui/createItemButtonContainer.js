import { IMAGE } from "../../../assets/index.js";
import {
  createButton,
  createDeleteSvg,
  createElement,
  createImg,
} from "../../../dom.js";
import createEditModal from "../../Modal/createEditModal.js";
import createModal from "../../Modal/createModal.js";

const createItemButtonContainer = ({ sectionId, itemId, title, content }) => {
  const handleClickDelete = () => {
    createModal({ content: "선택한 카드를 삭제할까요?", sectionId, itemId });
  };

  const handleClickEdit = () => {
    createEditModal({ title, content, sectionId, itemId });
  };

  const $itemButtonContainer = createElement("div", {
    className: "column__item__buttonContainer",
  });

  const $deleteButton = createButton({
    className: "delete__button",
    handleClick: handleClickDelete,
  });

  const $deleteImg = createDeleteSvg({
    className: "delete__img",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
  });

  $deleteButton.appendChild($deleteImg);

  const $editButton = createButton({
    className: "edit__button",
    handleClick: handleClickEdit,
  });
  const $editImg = createImg({
    src: IMAGE.edit,
    alt: "수정",
  });

  $editButton.appendChild($editImg);

  $itemButtonContainer.append($deleteButton, $editButton);

  return $itemButtonContainer;
};

export default createItemButtonContainer;
