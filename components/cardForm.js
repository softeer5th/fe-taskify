import { renderTasks } from "../script/column.js";
import { columns } from "../script/index.js";
import { taskHTML } from "../script/task.js";

export function onEdit(e, task) {
    // 새로고침 방지
    e.preventDefault();
    const { title, content, created, column } = task;

    const idx = columns[column].indexOf(task);
    const newTitle = e.target.title.value;
    const newContent = e.target.content.value;
    const newTask = { ...task, title: newTitle, content: newContent };
    columns[column][idx] = newTask;

    renderTasks(column);
}

export function onCancelEdit(task, cardElement) {
    // task 내부를 task HTML로 재교체
    cardElement.innerHTML = taskHTML({ ...task });
}

export function onChange(e) {
    const form = e.target.parentNode;

    const title = form.title.value;
    const content = form.content.value;

    const [cancelButton, deleteButton] = form.getElementsByTagName("button");
    
    const currentDisabled = Boolean(deleteButton.disabled);
    if (title.length !== 0 && content.length !== 0) {
        if (currentDisabled) {
            deleteButton.classList.remove("disabled");
            deleteButton.disabled = false;
        }
    } else {
        if (!currentDisabled) {
            deleteButton.classList.add("disabled");
            deleteButton.disabled = true;
        }
    }
}

export function onSubmit(e, columnIdx) {
    // 새로고침 방지
    e.preventDefault();
    const self = e.target;
    const title = self.title.value;
    const content = self.content.value;

    self.parentNode.removeChild(self);

    const newTask = {
        title: title,
        content: content,
        created: new Date(),
        column: columnIdx,
    };

    // columns 상태에 새 task 추가
    columns[columnIdx].push(newTask);

    renderTasks(columnIdx);
}

export function onCancel(e) {
    // self = delete button
    const self = e.target;

    // form 삭제
    self.parentNode.parentNode.removeChild(self.parentNode);
}

export default function CardForm() {
    return (
        `
            <form class="card_form card surface-default shadow-normal rounded-100">
                <input name="title" class="text-strong display-bold14" type="text" placeholder="제목을 입력하세요"/>
                <input name="content" class="text-default display-medium14" type="text" placeholder="내용을 입력하세요"/>
                <span>
                    <button class="rounded-100 surface-alt text-default display-bold14" type="button">취소</button>
                    <button class="rounded-100 surface-brand text-white-default display-bold14 disabled" disabled type="submit">제출</button>
                </span>
            </form>
        `
        );
}
