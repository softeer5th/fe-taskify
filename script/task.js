import ModalComponent from "../components/modal.js";
import FormComponent from "../components/Form.js";
import TaskComponent from "../components/task.js";

export default function TaskController(state, rerender) {
    const formComponent = FormComponent();
    const taskComponent = TaskComponent();

    // Task 수정 Form 렌더링 함수
    function renderEditForm(taskId, originalElement) {
        const task = state.getTask(taskId);
        const editFormElement = formComponent.renderEdit(task);

        formComponent.addUpdateEventListener(
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
    function renderTask(parentElement, taskId) {
        const task = state.getTask(taskId);
        const newTaskElement = taskComponent.render(task);

        taskComponent.addEventListener(
            newTaskElement,
            () => removeTask(taskId, newTaskElement),
            () =>
                taskComponent.renderSwap(
                    newTaskElement,
                    renderEditForm(taskId, newTaskElement)
                ),
            (e) => dragTask(e, taskId)
        );

        parentElement.appendChild(newTaskElement);
    }

    // Task 삭제
    function removeTask(taskId, taskElement) {
        const task = state.getTask(taskId)
        const modalComponent = ModalComponent();

        modalComponent.render("선택한 카드를 삭제할까요?", () => {
            state.removeTask(task);
            taskElement.parentNode.removeChild(taskElement);
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

        const newTaskElement = taskComponent.render(newTask);

        taskComponent.addEventListener(
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
        taskComponent.addEventListener(dummyElement);

        dummyElement.style.opacity = 0.3;

        state.setDragged({
            task: task,
            element: e.target,
            dummyElement: dummyElement,
        });
    }

    return {
        renderTask,
        removeTask,
        editTask,
    };
}
