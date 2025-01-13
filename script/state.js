export default function State() {
    let orderingState = 1;
    let taskId = 0;

    let columnTasks = [];
    let columns = [
        {
            title: "해야할 일",
            index: 0,
        },
        {
            title: "하고 있는 일",
            index: 1,
        },
        {
            title: "완료한 일",
            index: 2,
        },
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
        return orderingState;
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
        };
    }

    function getColumns() {
        return { columns, columnTasks };
    }

    function addTask(index, task) {
        const newId = taskId++;
        const newTask = {
            ...task,
            taskId: newId,
        };
        setLog({
            task: newTask,
            type: "ADD",
            updated: new Date(),
        });
        columnTasks[index].push(newTask);

        return newId;
    }

    function updateTask(index, currentTask, newTask) {
        setLog({
            task: currentTask,
            type: "UPDATE",
            updated: new Date(),
        });

        const taskIndex = columnTasks[index].indexOf(currentTask);
        columnTasks[index][taskIndex] = {...newTask, taskId: currentTask.taskId};
    }

    function removeTask(task) {
        setLog({
            task: task,
            type: "REMOVE",
            updated: new Date(),
        });
        const index = task.column;
        columnTasks[index] = columnTasks[index].filter((el) => el.taskId != task.taskId);
    }

    function sortTask(task) {
        return task.sort((a, b) => orderingState * (a.created - b.created))
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
        sortTask, 
    };
}
