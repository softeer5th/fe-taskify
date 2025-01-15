import FabComponent from "../components/fab.js";
import ColumnController from "./column.js";

export default function FabController(bodyElement, state, logStore) {
    const fabComponent = FabComponent();
    const columnController = ColumnController(state, bodyElement, logStore);
    const {columns, columnTasks} = state.getColumns();

    function handleRedo() {
        const log = logStore.redo();
        if(!log || log === undefined) return;

        const {type, task, updated, destination} = log;

        const columnIdx = task.column;

        switch(type) {
            case "ADD":
                state.addTask(columnIdx, task, task.taskId);
                columnController.renderColumn(columnIdx, state.sortTask(columnTasks[columnIdx]))
                break;
            case "REMOVE":
                state.removeTask(task)
                columnController.renderColumn(columnIdx, state.sortTask(columnTasks[columnIdx]))
                break;
            case "UPDATE":
                console.log('TOBE ');
                break;
            case "MOVE":
                state.moveTask(destination, task);

                columnController.renderColumn(task.column, state.sortTask(columnTasks[task.column]))
                columnController.renderColumn(destination, state.sortTask(columnTasks[destination]))
                break;
        }

    }

    function handleUndo() {
        const log = logStore.undo();
        if(!log || log === undefined) return;

        const {type, task, updated, destination, origin} = log;

        const columnIdx = task.column;

        const flippedType = flip(type);

        switch(flippedType) {   
            case "ADD":
                state.addTask(columnIdx, task, task.taskId);
                columnController.renderColumn(columnIdx, state.sortTask(columnTasks[columnIdx]))
                break;
            case "REMOVE":
                state.removeTask(task)
                columnController.renderColumn(columnIdx, state.sortTask(columnTasks[columnIdx]))
                break;
            case "UPDATE":
                console.log('TOBE');
                break;
            case "MOVE":
                const originColumn = task.column;
                const newTask = {...task, column: destination}

                state.moveTask(originColumn, newTask);

                columnController.renderColumn(originColumn, state.sortTask(columnTasks[originColumn]))
                columnController.renderColumn(destination, state.sortTask(columnTasks[destination]))
                break;
        }

        
    }

    function renderInit() {
        const container = document.createElement("div");
        container.setAttribute("id", "fab_container");
        const redoElement = fabComponent.render("redo", "surface-default");
        fabComponent.addListener(redoElement, handleRedo);
        container.appendChild(redoElement);

        const undoElement = fabComponent.render("undo", "surface-default");
        fabComponent.addListener(undoElement, handleUndo);
        container.appendChild(undoElement);
        bodyElement.appendChild(container);
    }

    function flip(input) {
        return input === "ADD" ? "REMOVE" : input === "REMOVE" ? "ADD" : input;
      }
      

    return {
        renderInit,
    };
}
