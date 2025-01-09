import FormHTML from "../components/Form.js";
import { renderTasks } from "../script/column.js";
import { columns } from "../script/index.js";
import { taskEventHandler, taskHTML } from "../script/task.js";
import { setLog } from "./logScript.js";

export default function createFormElement(task, columnIdx) {
    const cardElement = document.createElement("li");
    cardElement.innerHTML = FormHTML();

    const form = cardElement.firstElementChild;

    const [cancelButton, submitButton] = form.getElementsByTagName("button");

    // task가 존재한다면 수정을 위한 Form
    // task가 존재하지 않는다면 생성을 위한 Form
    if (task) {
        const { title, content, created, column } = task;
        submitButton.removeAttribute("disabled");
        submitButton.classList.remove("disabled");

        form.addEventListener("submit", (e) => onEdit(e, task));
        form.addEventListener("change", onChange);

        cancelButton.addEventListener("click", () =>
            onCancelEdit(task, cardElement)
        );

        const inputs = cardElement.getElementsByTagName("input");
        const [titleInput, contentInput] = inputs;
        titleInput.value = title;
        contentInput.value = content;
    } else {
        form.addEventListener("submit", (e) => onSubmit(e, columnIdx));
        form.addEventListener("change", onChange);
        cancelButton.addEventListener("click", onCancel);
    }
    return cardElement;
}

function onEdit(e, task) {
    // 새로고침 방지
    e.preventDefault();
    const { title, content, created, column } = task;

    const idx = columns[column].indexOf(task);
    const newTitle = e.target.title.value;
    const newContent = e.target.content.value;
    const newTask = { ...task, title: newTitle, content: newContent };

    columns[column][idx] = newTask;

    setLog({
        task: task,
        type: 'update',
        updated: new Date(),
    })

    renderTasks(column);
}

function onCancelEdit(task, cardElement) {
    // task 내부를 task HTML로 재교체
    cardElement.innerHTML = taskHTML({ ...task });

    // 이벤트 재할당
    taskEventHandler(cardElement, task);
}

function onChange(e) {
    const form = e.target.parentNode;

    const title = form.title.value;
    const content = form.content.value;

    const [cancelButton, editButton] = form.getElementsByTagName("button");

    const currentDisabled = Boolean(editButton.disabled);
    if (title.length !== 0 && content.length !== 0) {
        if (currentDisabled) {
            editButton.classList.remove("disabled");
            editButton.disabled = false;
        }
    } else {
        if (!currentDisabled) {
            editButton.classList.add("disabled");
            editButton.disabled = true;
        }
    }
}

function onSubmit(e, columnIdx) {
    // 새로고침 방지
    e.preventDefault();
    const self = e.target;
    const title = self.title.value;
    const content = self.content.value;

    self.parentNode.removeChild(self);

    const created = new Date();

    const newTask = {
        title: title,
        content: content,
        created: created,
        column: columnIdx,
    };

    setLog({
        task: newTask,
        type: 'add',
        updated: created
    })

    // columns 상태에 새 task 추가
    columns[columnIdx].push(newTask);

    renderTasks(columnIdx);
}

function onCancel(e) {
    // self = delete button
    const self = e.target;

    // form 삭제
    self.parentNode.parentNode.removeChild(self.parentNode);
}
