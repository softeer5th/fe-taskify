import ModalComponent from "../components/modal.js";
import FormComponent from "../components/form.js";
import TaskComponent from "../components/task.js";

export default function TaskController(state, logStore, rerender) {
    const formComponent = FormComponent();
    const taskComponent = TaskComponent();

    // Task 수정 Form 렌더링 함수
    function renderEditForm(taskId, originalElement) {
        const task = state.getTask(taskId);
        const editFormElement = formComponent.renderEdit(task);

        formComponent.addUpdateListener(
            editFormElement,
            (e) => {
                editTask(e, editFormElement, taskId);
            },
            () => {
                formComponent.initEdit(editFormElement, task);
                taskComponent.renderSwap(editFormElement, originalElement);
            }
        );

        return editFormElement;
    }

    // Task 렌더링 함수
    function renderTask(taskId) {
        const task = state.getTask(taskId);
        const newTaskElement = taskComponent.render(task);

        taskComponent.addListener(
            newTaskElement,
            () => removeTask(taskId, newTaskElement),
            () =>
                taskComponent.renderSwap(
                    newTaskElement,
                    renderEditForm(taskId, newTaskElement)
                ),
            (e) => dragTask(e, taskId)
        );

        return newTaskElement;
    }

    // Task 삭제
    function removeTask(taskId, taskElement) {
        const task = state.getTask(taskId)
        const modalComponent = ModalComponent();

        modalComponent.render("선택한 카드를 삭제할까요?", () => {
            state.removeTask(task);
            logStore.addLog({
                task: task,
                type: "REMOVE",
                updated: new Date(),
            })
            rerender(task.column);
        });
    }

    // Task 수정
    function editTask(e, currentElement, taskId) {
        e.preventDefault();
        
        const task = state.getTask(taskId)

        const newTitle = e.target.title.value;
        const newContent = e.target.content.value;
        const newTask = { ...task, title: newTitle, content: newContent };
    
        state.updateTask(task.column, task, newTask);
        logStore.addLog({
            task: task,
            type: "UPDATE",
            updated: new Date(),
            updatedTask: newTask
        });

        const newTaskElement = taskComponent.render(newTask);

        taskComponent.addListener(
            newTaskElement,
            () => removeTask(taskId, newTaskElement),
            () =>
                taskComponent.renderSwap(
                    newTaskElement,
                    renderEditForm(taskId, newTaskElement)
                ),
            (e) => dragTask(e, taskId)
        );

        const parentElement = currentElement.parentNode;

        parentElement.replaceChild(newTaskElement, currentElement);
    }

    function dragTask(e, taskId) {
        const task = state.getTask(taskId)
        const dummyElement = taskComponent.render(task);
        taskComponent.addListener(dummyElement);

        dummyElement.style.opacity = 0.3;

        state.setDragged({
            task: task,
            element: e.target,
            dummyElement: dummyElement,
        });
    }

    function rerenderTask(taskId) {
        const taskElements = document.body.querySelectorAll('.card');

        let taskElement = null;
        for(let el of taskElements) {
            const _taskId = Number(el.getAttribute('taskid'));
            if(_taskId === taskId) {
                taskElement = el;
                break;
            }
        }
        
        const newTaskElement = renderTask(taskId)

        taskElement.parentNode.replaceChild(newTaskElement, taskElement);
    }

    return {
        renderTask,
        rerenderTask,
        removeTask,
        editTask,
    };
}
