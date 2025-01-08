function createSection(containerId, title) {
    const container = document.querySelector('main');

    const section = document.createElement('section');
    section.className = 'bold16';
    section.innerHTML = `
        <div class="menu">
            <p>${title}</p>
            <span class="count-todo"></span>
            <div>
                <button id="plus-${containerId}">
                    <img src="./assets/plus.svg" alt="plus">
                </button>
                <button>
                    <img src="./assets/closed.svg" alt="close">
                </button>
            </div>
        </div>
        <ul class="list" id="list-${containerId}"></ul>
    `;
    container.appendChild(section);

    const ulElement = document.getElementById(`list-${containerId}`);

    document.getElementById(`plus-${containerId}`).addEventListener('click', () => {
        toggleTaskBox(`list-${containerId}`, title);
        ulElement.style.height = `${ulElement.scrollHeight + 300}px`;
    });
}

export const DOMLoaded = () => {
    createSection('todo', '해야할 일');
    createSection('doing', '하고 있는 일');
    createSection('done', '완료한 일');

    initializeDragAndDrop();
};

const initializeDragAndDrop = () => {
    const lists = ['list-todo', 'list-doing', 'list-done'];

    lists.forEach(listId => {
        const list = document.getElementById(listId);

        list.addEventListener('dragstart', (e) => {
            e.target.classList.add('dragging');
        });

        list.addEventListener('dragend', (e) => {
            e.target.classList.remove('dragging');
        });

        list.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        list.addEventListener('drop', (e) => {
            e.preventDefault();

            const afterElement = getDragAfterElement(list, e.clientY);
            const draggable = document.querySelector('.dragging');
            if (draggable) {
                if (afterElement) {
                    list.insertBefore(draggable, afterElement);
                } else {
                    list.appendChild(draggable);
                }
                console.log(list.scrollHeight);
                list.style.height = `${list.scrollHeight + 300}px`;
            }
        });
    });
};

const getDragAfterElement = (list, y) => {
    const draggableElements = [...list.querySelectorAll('.task-item:not(.dragging)')];

    const result = draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;

    return result;
};

const toggleTaskBox = (listId, type) => {
    const list = document.getElementById(listId);
    let taskBox = list.querySelector('.task-box');

    if (taskBox) {
        taskBox.remove();
    } else {
        taskBox = createTaskBox(type, list);
        list.insertBefore(taskBox, list.firstChild);
    }
};

const createTaskBox = (type, list, task = null) => {
    const taskBox = document.createElement('div');
    taskBox.className = 'task-box';

    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.placeholder = '제목 입력';
    if (task) titleInput.value = task.querySelector('h3').innerText;

    const contentInput = document.createElement('textarea');
    contentInput.placeholder = '내용 입력';
    if (task) contentInput.value = task.querySelector('p').innerText;

    const btnWrapper = document.createElement('div');
    btnWrapper.className = 'btn-wrapper';

    const cancelBtn = document.createElement('button');
    cancelBtn.innerText = '취소';
    cancelBtn.onclick = () => {
        if (task) {
            taskBox.replaceWith(task);
        } else {
            taskBox.remove();
        }
    };

    const addBtn = document.createElement('button');
    addBtn.innerText = task ? '저장' : '등록';
    addBtn.disabled = !titleInput.value || !contentInput.value;
    addBtn.onclick = () => {
        if (task) {
            task.querySelector('h3').innerText = titleInput.value;
            task.querySelector('p').innerText = contentInput.value;
            taskBox.replaceWith(task);
        } else {
            const newTask = createTaskElement(type, titleInput.value, contentInput.value);
            list.insertBefore(newTask, list.firstChild);
            taskBox.remove();
        }
    };

    titleInput.addEventListener('input', () => {
        addBtn.disabled = !titleInput.value || !contentInput.value;
    });

    contentInput.addEventListener('input', () => {
        addBtn.disabled = !titleInput.value || !contentInput.value;
    });

    taskBox.appendChild(titleInput);
    taskBox.appendChild(contentInput);
    btnWrapper.appendChild(cancelBtn);
    btnWrapper.appendChild(addBtn);
    taskBox.appendChild(btnWrapper);

    return taskBox;
};

const createTaskElement = (type, title, content) => {
    const task = document.createElement('li');
    task.className = 'task-item';
    task.draggable = true;

    const taskTitle = document.createElement('h3');
    taskTitle.innerText = title;

    const taskContent = document.createElement('p');
    taskContent.innerText = content;

    const editBtn = document.createElement('button');
    editBtn.innerText = '수정';
    editBtn.onclick = () => {
        const list = task.parentElement;
        const taskBox = createTaskBox(type, list, task);
        task.replaceWith(taskBox);
    };

    task.appendChild(taskTitle);
    task.appendChild(taskContent);
    task.appendChild(editBtn);

    return task;
};