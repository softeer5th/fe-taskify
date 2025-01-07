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

    document.getElementById(`plus-${containerId}`).addEventListener('click', () => {
        toggleTaskBox(`list-${containerId}`, title);
    });
}

export const DOMLoaded = () => {
    createSection('todo', '해야할 일');
    createSection('doing', '하고 있는 일');
    createSection('done', '완료한 일');
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
            list.appendChild(newTask);
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