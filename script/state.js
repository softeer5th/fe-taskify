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

    let dragged = {
        task: null,
        element: null,
    };

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
        columnTasks[index].push(task);
    }

    function updateTask(index, currentTask, newTask) {
        const taskIndex = columnTasks[index].indexOf(currentTask);
        columnTasks[index][taskIndex] = newTask;
    }

    function removeTask(task) {
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
    }
}
