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

    let dragged = {
        task: null,
        element: null,
        dummyElement: null,
    };

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

    function setDragged({ task, element, dummyElement }) {
        dragged = {
            task: task,
            element: element,
            dummyElement: dummyElement,
        };
    }

    function getDragged() {
        return dragged;
    }

    function resetDragged() {
        dragged = {
            task: null,
            element: null,
            dummyElement: null,
        };
    }

    function getColumns() {
        return { columns, columnTasks };
    }

    function getTask(taskId) {
        for(let i =0; i<columns.length; i++) {
            const matchedTask = columnTasks[i].find(el => el.taskId === taskId)
            if(matchedTask) {
                return matchedTask;
            }
        }
    }

    function addTask(index, task, id) {
        let newTask = null;
        let newId = null;
        
        if(id === undefined) {
            newId = taskId++;
            newTask = {
                ...task,
                taskId: newId,
            };
        }
        else {
            newTask = {
                ...task,
                taskId: id,
            };
        }
        columnTasks[index].push(newTask);

        return id === undefined ? newId : id;
    }

    function moveTask(destinationIndex, task) {
        const newTask = {...task, column : destinationIndex};
        const currentIndex = task.column;

        columnTasks[currentIndex] = columnTasks[currentIndex].filter(el => el.taskId !== task.taskId);
        columnTasks[destinationIndex].push(newTask);
    }

    function updateTask(index, currentTask, newTask) {
        const taskIndex = columnTasks[index].findIndex((task)=>task.taskId === currentTask.taskId);
        columnTasks[index][taskIndex] = {...newTask, taskId: currentTask.taskId};
    }

    function removeTask(task) {
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
        getTask,
        addTask,
        moveTask,
        updateTask,
        removeTask,
        sortTask, 
    };
}
