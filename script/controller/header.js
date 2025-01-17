import HeaderComponent from "../../components/header.js";
import { LogComponent } from "../../components/log.js";
import ModalComponent from "../../components/modal.js";
import ColumnController from "./column.js";

export default function HeaderController(state, bodyElement, logStore) {
    const { columns, columnTasks } = state.getColumns();
    const headerComponent = HeaderComponent();
    const logComponent = LogComponent(columns, logStore, renderClearLogModal);

    // Column 동적 생성 및 이벤트 등록
    function renderInit() {
        const headerElement = headerComponent.render();
        headerComponent.addListener(headerElement, handleSort, renderLog);

        bodyElement.appendChild(headerElement);
    }

    function renderClearLogModal() {
        const modalComponent = ModalComponent();
        modalComponent.render("모든 사용자 활동 기록을 삭제할까요?", () =>
            logStore.clearLog()
        );
    }

    function renderLog() {
        const logs = logStore.getLogs();
        const existLogElement = bodyElement.querySelector("#log_layer");

        if (existLogElement) {
            logComponent.remove();
        } else {
            const logElement = logComponent.render(logs);
            bodyElement.appendChild(logElement);
        }
    }

    function handleSort() {
        const columnController = ColumnController(state, bodyElement);
        const currentOrder = state.flipOrder();

        for (let i = 0; i < columns.length; i++) {
            columnController.renderColumn(i, state.sortTask(columnTasks[i]));
        }

        return currentOrder;
    }

    return {
        renderInit,
        renderLog,
    };
}
