import { createDefaultColumnHTML } from "./template/column.js";
import { initActionLogArray } from "./data/actionLog.js";
import { createDefaultColumns } from "./data/column.js"
import { initHistoryStack } from "./data/history.js";
import { addColumnEventListener } from "./event/column.js";


const initData = () => {
    const columns = createDefaultColumns();
    const historyStack = initHistoryStack();
    const actionLog = initActionLogArray();
    return {
        columns, historyStack, actionLog
    }
}

const initColumnLayout = (columnDatas) => {
    const columnTemplate = createDefaultColumnHTML(columnDatas);
    let mainContainer = document.querySelector(".main-container");
    mainContainer.innerHTML = columnTemplate;
    const columnElements = document.querySelectorAll(".column-template");
    [...columnElements].forEach((columnElement, index) => addColumnEventListener(columnElement, index));

}

export const App = () => {
    const { columns, historyStack, actionLog } = initData();
    initColumnLayout(columns);
}

App();