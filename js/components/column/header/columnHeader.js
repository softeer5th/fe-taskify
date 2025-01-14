import { onAddCard } from "../../../action/stateActions.js";
import { buttons } from "../buttons/buttons.js";
import { columnHeaderContentCount } from "./columnHeaderContentNum.js";
import { columnHeaderTitle } from "./columnHeaderTitle.js";

export const columnHeader = ({ column, setState }) => {
    const { id, title, contentCount } = column;

    const columnHeader = document.createElement("div");
    columnHeader.className = "column-header";

    const columnHeaderLeft = document.createElement("div");
    columnHeaderLeft.className = "column-header-left";

    columnHeaderLeft.appendChild(columnHeaderTitle(title));
    columnHeaderLeft.appendChild(columnHeaderContentCount(contentCount));

    const buttonDiv = buttons();

    buttonDiv.addEventListener("click", (e) => {
        if (e.target.closest("button").classList.contains("column-header-plus-button")) {
            onAddCard(id, setState);
        }
        if (e.target.closest("button").classList.contains("column-header-content-delete-button")) {
            console.log("Column Delete!")
        }
    })

    columnHeader.appendChild(columnHeaderLeft);
    columnHeader.appendChild(buttonDiv);

    return columnHeader;
}