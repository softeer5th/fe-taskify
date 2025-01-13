import { createComponent } from "../../../global/createComponent.js"
import { buttons } from "../buttons/buttons.js";
import { columnHeaderContentCount } from "./columnHeaderContentNum.js";
import { columnHeaderTitle } from "./columnHeaderTitle.js";

export const columnHeader = ({ column, onAddCard }) => {

    const { id, title, contentCount } = column;

    const columnHeader = document.createElement("div");
    columnHeader.className = "column-header";

    const columnHeaderLeft = document.createElement("div");
    columnHeaderLeft.className = "column-header-left";

    columnHeaderLeft.appendChild(columnHeaderTitle(title));
    columnHeaderLeft.appendChild(columnHeaderContentCount(contentCount));

    const buttonDiv = buttons(id, onAddCard);

    columnHeader.appendChild(columnHeaderLeft);
    columnHeader.appendChild(buttonDiv);

    return columnHeader;
}