import FormComponent from "../../components/form/form.js";
import ColumnComponent from "../../components/column/column.js";
import ModalComponent from "../../components/modal/modal.js";
import TaskController from "./task.js";

export default function ColumnController(state, logStore) {
    const { columns: columnList, columnTasks } = state.getColumns();
    const columnComponent = ColumnComponent();
    const formComponent = FormComponent();
    const taskController = TaskController(state, logStore, (idx)=>{
        renderColumn(idx, columnTasks[idx]);
    });

    function handleDrop(e) {
        e.stopPropagation();
        const {task, element, dummyElement} = state.getDragged();
        const columnListElement = e.currentTarget;
        const startIdx = task.column;
        const columnIdx = Number(columnListElement.parentNode.getAttribute('index'));

        if(task.column !== columnIdx) columnListElement.removeChild(dummyElement);
        resetDrop();
        columnListElement.appendChild(element);

        state.moveTask(columnIdx, task);
        logStore.addLog({
            task: task,
            type: "MOVE",
            updated: new Date(),
            destination: columnIdx
        })
        state.resetDragged();

        renderColumn(startIdx, state.sortTask(columnTasks[startIdx]))
        renderColumn(columnIdx, state.sortTask(columnTasks[columnIdx]))
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

        const tempTask = state.sortTask([...columnTasks[columnIdx], task])
        const dragIdx = tempTask.findIndex(el => el.taskId == task.taskId);

        const targetElement = columnListElement.children[dragIdx];

        columnListElement.insertBefore(dummyElement, targetElement);
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
    // 입력받은 tasks와 현재 존재하는 task Element를 비교하여 존재하는 Element는 재사용, 존재하지 않는 Element는 생성, 필요 없어진 Element는 삭제 진행
    // 애니메이션 적용
    function renderColumn(idx, tasks) {
        const columnElement = document.body.querySelectorAll('.column')[idx];        
        const columnListElement = columnElement.querySelector(".card_list");

        const currentCounter = Number(columnElement.querySelector('.column_task_counter').textContent);

        // Task의 개수가 변동 시, 숫자 변경
        if(currentCounter != tasks.length) {
            columnComponent.rerenderHeader(idx, tasks.length);
        }

        // 변경 전 Element들의 위치 저장
        const originalPosition = [...columnListElement.children].map(el => {
            const {top} = el.getBoundingClientRect();
            const taskId = Number( el.getAttribute('taskId'));

            return {
                element: el,
                taskId: taskId,
                top: top
            }
        });

        // 잔여 Task 목록
        const currentTasksWithId = Array.from(columnListElement.children).map((el) => {
                return {
                    taskId: Number(el.getAttribute("taskid")),
                    element: el,
                };
        });

        const taskFragmentElement = document.createDocumentFragment();
        const _currentTasksWithId = [...currentTasksWithId]

        for (let i=0; i<tasks.length; i++) {
            const task = tasks[i];
            const matchedIdx = _currentTasksWithId.findIndex(el => el.taskId === task.taskId);

            // 일치하는 Element가 존재할 경우, 잔여 Task 목록에서 제거
            if(matchedIdx != -1) {
                const matchedTask = currentTasksWithId[matchedIdx];
                currentTasksWithId[matchedIdx] = undefined;
                const matchedTaskElement = matchedTask.element;
                taskFragmentElement.appendChild(matchedTaskElement);
                continue;
            }
            const newTaskElement = taskController.renderTask(task.taskId);
            taskFragmentElement.appendChild(newTaskElement);
        }

        // 일치하지 않는 잔여 Task 삭제
        currentTasksWithId.forEach((el)=>{
            if(el === undefined) return;
            columnListElement.removeChild(el.element)
        })

        columnListElement.appendChild(taskFragmentElement);

        // 새로 렌더링 될 Element들의 위치 계산
        const newPosition = [...columnListElement.children].map(el => {
            const {top} = el.getBoundingClientRect();
            const taskId = Number( el.getAttribute('taskId'));

            return {
                taskId: taskId,
                top: top
            }
        });

        originalPosition.forEach((el)=>{
            const {top, taskId, element} = el;

            const pos = newPosition.find(el => el.taskId === taskId);
            if(!pos) return;

            const {top: _top, taskId: _taskId} = pos;
            const deltaY = top - _top;

            if(deltaY === 0) return;

            element.style.transform = `translateY(${deltaY}px)`;
            element.style.transition = `none`;

            setTimeout(() => {
                element.style.transition = "transform 0.3s ease";
                element.style.transform = "translate(0, 0)";
            }, 0);
        })


        /* GPT 도움 받은 영역 */
        // originalPosition.forEach((el)=>{
        //     const {top, taskId, element} = el;

        //     const {top: _top, taskId: _taskId} = newPosition.find(el => el.taskId === taskId);
        //     const deltaY = top - _top;


        //     element.style.transition = "none";
        //     element.style.transform = `translateY(${deltaY}px)`;

        //     requestAnimationFrame(() => {
        //         element.style.transition = "transform 0.3s ease";
        //         element.style.transform = "translate(0, 0)";
        //     });
        // })

    }

    function resetDrop() {
        const {task, element, dummyElement} = state.getDragged();
        element.style.opacity = 1;
    }

    // Task 생성 Form Submit handler
    function handleSubmit(title, content, columnIdx) {
        const newTask = {
            title: title,
            content: content,
            column: columnIdx,
            created: new Date(),
        };

        const newId = state.addTask(columnIdx, newTask);
        logStore.addLog({
            task: {...newTask, taskId: newId},
            type: "ADD",
            updated: new Date(),
        })
        renderColumn(columnIdx, state.sortTask(columnTasks[columnIdx]));
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
        formComponent.addAddListener(formElement, (title, content) =>
            handleSubmit(title, content, columnIdx)
        );

        formContainer.appendChild(cardElement);
    }

    // Column 동적 생성 및 이벤트 등록
    function renderInit() {
        document.body.oncontextmenu = (e) => e.preventDefault();
        const mainElement = document.createElement("main");
        const columnContainerElement = document.createElement("ul");
        columnContainerElement.setAttribute("id", "column_container");
        columnContainerElement.addEventListener("dragover", (e) =>
            e.preventDefault()
        );
        columnContainerElement.addEventListener("drop", resetDrop);
        const columnListFragment = document.createDocumentFragment();

        for (let column of columnList) {
            const columnElement = columnComponent.render(column);
            columnComponent.addListener(
                columnElement,
                (formContainer, columnIdx) =>
                    renderAddForm(formContainer, columnIdx),
                handleDrop,
                handleDragEnter,
                handleDragLeave,
                (index, title) => state.editColumn(index, title),
                () => removeColumn(column, columnElement)
            );
            columnListFragment.appendChild(columnElement);
        }

        columnContainerElement.appendChild(columnListFragment);
        mainElement.appendChild(columnContainerElement);
        document.body.appendChild(mainElement);
    }

    function addColumn(title) {
        const column = state.addColumn(title);

        const columnElement = columnComponent.render(column);
        columnComponent.addListener(
            columnElement,
            (formContainer, columnIdx) =>
                renderAddForm(formContainer, columnIdx),
            handleDrop,
            handleDragEnter,
            handleDragLeave,
            (index, title) => state.editColumn(index, title),
            () => removeColumn(column, columnElement)
        );

        const columnContainerElement = document.querySelector("ul");
        columnContainerElement.appendChild(columnElement);
    }

    function removeColumn(column, columnElement) {
        if (column.nonRemovable) return;
        
        const { title, index: columnIdx } = column;

        const modalComponent = ModalComponent();
        modalComponent.render(`"${title}" 컬럼을 삭제하시겠습니까?`, () => {
            state.removeColumn(columnIdx);
            columnComponent.remove(columnElement);
            logStore.clearLog();
        });
    }

    function rerenderTask(taskId) {
        taskController.rerenderTask(taskId);
    }

    return {
        renderInit,
        renderColumn,
        rerenderTask,
        addColumn,
    };
}
