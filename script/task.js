import ModalComponent from "../components/modal.js";
import FormComponent from "../components/Form.js";
import TaskComponent from "../components/task.js";

export default function TaskController(state, rerender) {
    const formComponent = FormComponent();
    const taskComponent = TaskComponent();

    function renderDummyTask(task) {
        const dummyTaskElement = taskComponent.render(task);
        taskComponent.addEventListener(dummyTaskElement);
        dummyTaskElement.style.opacity = 0.3;
        return dummyTaskElement;
    }

    // Task 수정 Form 렌더링 함수
    function renderEditForm(task, originalElement) {
        const editFormElement = formComponent.renderEdit(task);
        formComponent.addUpdateEventListener(
            editFormElement,
            (e) => {
                editTask(e, editFormElement, task);
            },
            () => {
                formComponent.initEdit(editFormElement, task);
                taskComponent.renderSwap(editFormElement, originalElement);
            }
        );

        return editFormElement;
    }

    // Task 렌더링 함수
    function renderTask(parentElement, task) {
        const newTaskElement = taskComponent.render(task);

        taskComponent.addEventListener(
            newTaskElement,
            () => removeTask(task, newTaskElement),
            () =>
                taskComponent.renderSwap(
                    newTaskElement,
                    renderEditForm(task, newTaskElement)
                ),
            (e) => dragTask(e, task)
        );

        parentElement.appendChild(newTaskElement);
    }

    // Task 삭제
    function removeTask(task, taskElement) {
        const modalComponent = ModalComponent();

        modalComponent.render("선택한 카드를 삭제할까요?", () => {
            state.removeTask(task);
            taskElement.parentNode.removeChild(taskElement);
            rerender(task.column);
        });
    }

    // Task 수정
    function editTask(e, currentElement, task) {
        e.preventDefault();

        const newTitle = e.target.title.value;
        const newContent = e.target.content.value;
        const newTask = { ...task, title: newTitle, content: newContent };

        state.updateTask(task.column, task, newTask);

        const newTaskElement = taskComponent.render(newTask);

        taskComponent.addEventListener(
            newTaskElement,
            () => removeTask(newTask, newTaskElement),
            () =>
                taskComponent.renderSwap(
                    newTaskElement,
                    renderEditForm(newTask, newTaskElement)
                ),
            (e) => dragTask(e, newTask)
        );

        const parentElement = currentElement.parentNode;

        parentElement.replaceChild(newTaskElement, currentElement);
    }

    function dragTask(e, draggedTask) {
        const dummyElement = taskComponent.render(draggedTask);
        taskComponent.addEventListener(dummyElement);

        dummyElement.style.opacity = 0.3;

        state.setDragged({
            task: draggedTask,
            element: e.target,
            dummyElement: dummyElement,
        });
    }

    return {
        renderTask,
        removeTask,
        editTask,
        renderDummyTask,
    };
}
