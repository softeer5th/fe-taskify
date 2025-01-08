import { createDefaultColumnHTML } from "./template/column.js";
import { initActionLogArray } from "./data/actionLog.js";
import { createDefaultColumns } from "./data/column.js"
import { initHistoryStack } from "./data/history.js";

const initData = () => {
    const columns = createDefaultColumns();
    const historyStack = initHistoryStack();
    const actionLog = initActionLogArray();
    return {
        columns, historyStack, actionLog
    }
}

const addEventListener = (column) => {
    column.addEventListener("click", (e) => {
        //console.log(e.target.closest("button"))
        if (e.target && e.target.closest("button").className === "column-header-plus-button") {
            // 로직 작성
            alert("버튼 클릭!!!")
        }
    }, false);
}

const initColumnLayout = (columns) => {
    const columnTemplate = createDefaultColumnHTML(columns);
    let mainContainer = getMainContainer();
    mainContainer.innerHTML = columnTemplate;
    const columnElements = document.querySelectorAll(".column-template");
    [...columnElements].forEach(col => addEventListener(col));

}

const getMainContainer = () => document.querySelector(".main-container");

export const App = () => {
    const { columns, historyStack, actionLog } = initData();
    initColumnLayout(columns);
}

App();