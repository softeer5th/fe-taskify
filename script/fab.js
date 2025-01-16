import FabComponent from "../components/fab.js";
import ColumnController from "./column.js";

export default function FabController(bodyElement, state, logStore) {
    const fabComponent = FabComponent();
    const columnController = ColumnController(state, bodyElement, logStore);
    const {columns, columnTasks} = state.getColumns();

    function handleRedo(e) {
        const log = logStore.redo();

        if(!log || log === undefined) {
            const button = e.currentTarget;
            button.classList.add('vibration');
            setTimeout(()=>{
                button.classList.remove('vibration');
            }, 300)
            return;
        }

        const {type, task, updated, destination, updatedTask} = log;

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
                state.updateTask(columnIdx, task, updatedTask);
                
                columnController.rerenderTask(task.taskId);
                break;
            case "MOVE":
                state.moveTask(destination, task);

                columnController.renderColumn(task.column, state.sortTask(columnTasks[task.column]))
                columnController.renderColumn(destination, state.sortTask(columnTasks[destination]))
                break;
        }

    }

    function handleUndo(e) {
        const log = logStore.undo();

        if(!log || log === undefined) {
            const button = e.currentTarget;
            button.classList.add('vibration');
            setTimeout(()=>{
                button.classList.remove('vibration');
            }, 300)
            return;
        }

        const {type, task, updated, destination, updatedTask} = log;

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
                state.updateTask(columnIdx, updatedTask, task);
                
                columnController.rerenderTask(task.taskId);
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
