export default function State() {
    let orderingState = -1;
    
    let columnTasks = [];
    let columns = [
        {
            title: '해야할 일',
            index: 0,
        },
        {
            title: '하고 있는 일',
            index: 1,
        },
        {
            title: '완료한 일',
            index: 2,
        }
    ];
    let logs = [];

    let dragged = {
        task: null,
        element: null,
    };

    function setLog(log) {
        if (logs.length >= 5) {
            logs = [...logs.slice(1), log];
        } else logs.push(log);
    }

    function getLog() {
        return logs;
    }

    function clearLog() {
        logs = [];
    }

    function getOrder() {
        return orderingState;
    }

    function flipOrder() {
        orderingState = -orderingState;
    }

    function init() {
        for (let i = 0; i < columns.length; i++) {
            columnTasks.push([]);
        }
    }

    function setDragged({ task, element }) {
        dragged = {
            task: task,
            element: element,
        };
    }

    function getDragged() {
        return dragged;
    }

    function resetDragged(isOpacityChange) {
        dragged = {
            task: null,
            element: null,
        }
    }

    function getColumns() {
        return {columns, columnTasks};
    }

    function addTask(index, task) {
        setLog({
            task: task,
            type: 'ADD',
            updated: new Date(),
        });
        columnTasks[index].push(task);
    }

    function updateTask(index, currentTask, newTask) {
        setLog({
            task: currentTask,
            type: 'UPDATE',
            updated: new Date(),
        });
        const taskIndex = columnTasks[index].indexOf(currentTask);
        columnTasks[index][taskIndex] = newTask;
    }

    function removeTask(task) {
        setLog({
            task: task,
            type: 'REMOVE',
            updated: new Date(),
        });
        const index = task.column;
        columnTasks[index] = columnTasks[index].filter(el => el != task);
    }

    init();

    return {
        getOrder,
        flipOrder,
        getDragged,
        setDragged,
        resetDragged,
        getColumns,
        addTask,
        updateTask,
        removeTask,
        getLog,
        clearLog,
    }
}
