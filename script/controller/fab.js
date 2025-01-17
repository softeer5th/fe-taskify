import FabComponent from "../../components/main/fab.js";
import { ACTION_ADD, ACTION_MOVE, ACTION_REMOVE, ACTION_UPDATE } from "../lib/constant.js";
import ColumnController from "./column.js";

export default function FabController(state, logStore) {
    const fabComponent = FabComponent();
    const columnController = ColumnController(state, logStore);
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
            case ACTION_ADD:
                state.addTask(columnIdx, task, task.taskId);
            
                columnController.renderColumn(columnIdx, state.sortTask(columnTasks[columnIdx]))
                break;
            case ACTION_REMOVE:
                state.removeTask(task)
                
                columnController.renderColumn(columnIdx, state.sortTask(columnTasks[columnIdx]))
                break;
            case ACTION_UPDATE:
                state.updateTask(columnIdx, task, updatedTask);
                
                columnController.rerenderTask(task.taskId);
                break;
            case ACTION_MOVE:
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
            case ACTION_ADD:
                state.addTask(columnIdx, task, task.taskId);

                columnController.renderColumn(columnIdx, state.sortTask(columnTasks[columnIdx]))
                break;
            case ACTION_REMOVE:
                state.removeTask(task)
                
                columnController.renderColumn(columnIdx, state.sortTask(columnTasks[columnIdx]))
                break;
            case ACTION_UPDATE:
                state.updateTask(columnIdx, updatedTask, task);
                
                columnController.rerenderTask(task.taskId);
                break;
            case ACTION_MOVE:
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

        const addColumnElement = fabComponent.render("plus_white", "surface-brand");
        fabComponent.addListener(addColumnElement, handleAddColumn);
        container.appendChild(addColumnElement);

        document.body.appendChild(container);
    }

    function handleAddColumn() {
        const title = prompt('new Column title?');

        columnController.addColumn(title);
    }

    function flip(input) {
        return input === ACTION_ADD ? ACTION_REMOVE : input === ACTION_REMOVE ? ACTION_ADD : input;
      }
      

    return {
        renderInit,
    };
}
