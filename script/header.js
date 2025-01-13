import HeaderComponent from "../components/header.js";
import { LogComponent } from "../components/log.js";
import ModalComponent from "../components/modal.js";
import ColumnController from "./column.js";

export default function HeaderController(state, bodyElement) {
    const {columns, columnTasks} = state.getColumns();
    const headerComponent = HeaderComponent();
    const logComponent = LogComponent(columns);

    // Column 동적 생성 및 이벤트 등록
    function renderInit() {
        const headerElement = headerComponent.render();
        headerComponent.addEventListener(
            headerElement,
            handleSort,
            renderLog
        );

        bodyElement.appendChild(headerElement);
    }

    function renderClearLogModal() {
        const modalComponent = ModalComponent();
        modalComponent.render('진짜로 로그 삭제함?',
            ()=>{
                state.clearLog();
                renderLog();
                renderLog();
            }
        )
    }

    function renderLog() {
        const logs = state.getLog();
        const existLogElement = bodyElement.querySelector("#log_layer");

        if (existLogElement) {
            logComponent.remove();
        } else {
            const logElement = logComponent.render(logs);

            logComponent.addEventListener(
                logElement,
                () => logComponent.remove(),
                renderClearLogModal
            );
            bodyElement.appendChild(logElement);
        }
    }

    function handleSort() {
        const columnController = ColumnController(state, bodyElement);
        const currentOrder = state.flipOrder();

        for(let i=0; i<columns.length; i++) {
            columnController.renderColumn(i, state.sortTask(columnTasks[i]));
        }

        return currentOrder;
    }


    return {
        renderInit,
        renderLog,
    };
}
