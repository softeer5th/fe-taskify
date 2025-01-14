import FormComponent from "../components/Form.js";
import ColumnComponent from "../components/column.js";
import TaskController from "./task.js";

export default function ColumnController(state, bodyElement) {
    const { columns: columnList, columnTasks } = state.getColumns();
    const columnComponent = ColumnComponent();
    const formComponent = FormComponent();
    const taskController = TaskController(state, (idx)=>{
        columnComponent.rerenderHeader(idx, columnTasks[idx].length);
    });
    
    function handleDrop(e) {
        const {task, element, dummyElement} = state.getDragged();
        const columnListElement = e.currentTarget;
        const startIdx = task.column;
        const columnIdx = Number(columnListElement.parentNode.getAttribute('index'));


        if(task.column !== columnIdx) columnListElement.removeChild(dummyElement);
        element.style.opacity = 1;
        columnListElement.appendChild(element);

        state.moveTask(columnIdx, task)
        state.resetDragged();


        columnComponent.rerenderHeader(startIdx, columnTasks[startIdx].length);
        columnComponent.rerenderHeader(columnIdx, columnTasks[columnIdx].length);
    }

    function handleDragEnter(e) {
        if(e.currentTarget.contains(e.relatedTarget)) return;
        const {task, element, dummyElement} = state.getDragged();


        const columnListElement = e.currentTarget;
        const columnIdx = Number(columnListElement.parentNode.getAttribute('index'));

        if(task.column === columnIdx) {
            element.style.opacity = 0.3;
            return;
        }

        columnListElement.appendChild(dummyElement);
    }

    function handleDragLeave(e) {
        if(e.currentTarget.contains(e.relatedTarget)) return;
        const {task, element, dummyElement} = state.getDragged();

        const columnListElement = e.currentTarget;
        const columnIdx = Number(columnListElement.parentNode.getAttribute('index'));

        if(task.column === columnIdx) {
            element.style.opacity = 0;
            return;
        }

        if(columnListElement.contains(dummyElement)) {
            columnListElement.removeChild(dummyElement);
        }
    }

    // 각 Column의 task들 렌더링
    function renderColumn(idx, tasks) {

        const columnElement = bodyElement.querySelectorAll(".card_list")[idx];

        const currentTasksWithId = Array.from(columnElement.children).map((el) => {
            return {
                taskId: Number(el.getAttribute("taskid")),
                element: el,
            };
        });


        const taskFragmentElement = document.createDocumentFragment();

        for (let task of tasks) {

            const matchedTask = currentTasksWithId.find(el => el.taskId === task.taskId);
            
            if(matchedTask) {
                taskFragmentElement.appendChild(matchedTask.element);
                continue;
            }
            taskController.renderTask(taskFragmentElement, task.taskId);
        }

        columnElement.appendChild(taskFragmentElement);
    }

    // Task 생성 Form Submit handler
    function handleSubmit(title, content, columnIdx) {
        const newTask = {
            title: title,
            content: content,
            column: Number(columnIdx),
            created: new Date(),
        };

        const newId = state.addTask(columnIdx, newTask);
        renderColumn(columnIdx, state.sortTask(columnTasks[columnIdx]));
        columnComponent.rerenderHeader(columnIdx, columnTasks[columnIdx].length);
    }

    // Column의 + 버튼을 눌러 Task를 생성하기 위한 Form 생성
    function renderAddForm(formContainer, columnIdx) {
        // 이미 Form이 존재하는 경우, + 버튼으로 존재하는 Form을 닫기
        const isCardFormExists = formContainer.children.length !== 0;
        if (isCardFormExists) {
            formContainer.removeChild(formContainer.children[0]);
            return;
        }

        const { cardElement, formElement } = formComponent.render();
        formComponent.addAddEventListener(formElement, (title, content) =>
            handleSubmit(title, content, columnIdx)
        );

        formContainer.appendChild(cardElement);
    }

    // Column 동적 생성 및 이벤트 등록
    function renderInit() {
        const mainElement = document.createElement("main");
        const columnContainerElement = document.createElement("ul");
        columnContainerElement.setAttribute("id", "column_container");
        const columnListFragment = document.createDocumentFragment();

        for (let column of columnList) {
            const columnElement = columnComponent.render(column);
            columnComponent.addEventListener(
                columnElement,
                (formContainer, columnIdx) =>
                    renderAddForm(formContainer, columnIdx),
                handleDrop,
                handleDragEnter,
                handleDragLeave
            );
            columnListFragment.appendChild(columnElement);
        }

        columnContainerElement.appendChild(columnListFragment);
        mainElement.appendChild(columnContainerElement);
        bodyElement.appendChild(mainElement);
    }

    return {
        renderInit,
        renderColumn,
    };
}
