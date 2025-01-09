const saveTasksToLocalStorage = (tasks) => {
    console.log(tasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const loadTasksFromLocalStorage = () => {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [{ type: 'todo', list: [] }, { type: 'doing', list: [] }, { type: 'done', list: [] }];
};

async function loadTasksFromJSON () {
    const tasks = loadTasksFromLocalStorage();
    return tasks;
};

function createSection(containerId, title, tasks) {
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
                <button id="clear-${containerId}">
                    <img src="./assets/closed.svg" alt="close">
                </button>
            </div>
        </div>
        <ul class="list" id="list-${containerId}"></ul>
    `;
    container.appendChild(section);

    const ulElement = document.getElementById(`list-${containerId}`);

    document.getElementById(`plus-${containerId}`).addEventListener('click', () => {
        toggleTaskBox(`list-${containerId}`, containerId);
        ulElement.style.height = `${ulElement.scrollHeight + 300}px`;
    });

    document.getElementById(`clear-${containerId}`).addEventListener('click', () => {
        clearTasks(containerId);
    });

    tasks.filter(task => task.type === containerId).forEach(({ type, list }) => {
        list.forEach(({id, title, content}) => {
            const newTask = createTaskElement(type, id, title, content);

            ulElement.appendChild(newTask);
        });
    }); 
}

const clearTasks = (containerId) => {
    // TODO: 삭제 모달 추가
    let tasks = loadTasksFromLocalStorage();
    tasks = tasks.filter(task => task.type !== containerId);
    saveTasksToLocalStorage(tasks);

    const ulElement = document.getElementById(`list-${containerId}`);
    while (ulElement.firstChild) {
        ulElement.removeChild(ulElement.firstChild);
    }
};

export const DOMLoaded = async () => {
    const tasks = await loadTasksFromJSON();

    createSection('todo', '해야할 일', tasks);
    createSection('doing', '하고 있는 일', tasks);
    createSection('done', '완료한 일', tasks);

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
            const draggable = document.querySelector('.dragging'); // 드래그 요소
            if (draggable) {
                const previousParentId = draggable.parentElement.id;

                if (afterElement) {
                    list.insertBefore(draggable, afterElement);
                } else {
                    list.appendChild(draggable);
                }
                list.style.height = `${list.scrollHeight + 300}px`;

                const parentElementId = afterElement ? afterElement.parentElement.id : previousParentId;
                const targetListId = list.id;

                console.log(parentElementId, targetListId); // 기존의 섹션 id, 이동된 섹션 id
                console.log('draggable', draggable); // 이동된 요소 id
                console.log('item', e.target); // drop된 위치 (ul, li 둘 중 하나)
                
                const tasks = loadTasksFromLocalStorage();
                const updatedTasks = tasks.map(task => {
                    // 기존 섹션에서 삭제
                    if(task.type === parentElementId.replace('list-', '')) {
                        task.list = task.list.filter(t => {

                            return t.id !== parseInt(draggable.id.split('-')[1]);
                        });
                    }

                    // 이동된 섹션에서 추가
                    if(task.type === targetListId.replace('list-', '')) {
                        task.list.push({ id: parseInt(draggable.id.split('-')[1]), title: draggable.querySelector('h3').innerText, content: draggable.querySelector('p').innerText });
                    }

                    return task;
                });

                saveTasksToLocalStorage(updatedTasks);
            }
        });
    });
};

const getDragAfterElement = (list, y) => {
    const draggableElements = [...list.querySelectorAll('.task-item:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
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

            const tasks = loadTasksFromLocalStorage();

            const updatedTasks = [...tasks];
            const taskIndex = tasks.findIndex(task => task.title === draggable.querySelector('h3').innerText);
            if (taskIndex !== -1) {
                const updatedTask = {
                    ...tasks[taskIndex],
                    type: list.id.replace('list-', '')
                };
                updatedTasks.splice(taskIndex, 1); // 기존 위치에서 제거
                updatedTasks.push(updatedTask); // 배열의 맨 뒤로 추가
            }

            saveTasksToLocalStorage(updatedTasks);
        } else {

            const tasks = loadTasksFromLocalStorage();
            const totalCount = tasks.reduce((sum, item) => sum + item.list.length, 0);
            const newTask = createTaskElement(type, totalCount+1, titleInput.value, contentInput.value);
            list.insertBefore(newTask, list.firstChild);
            taskBox.remove();

            const nextId = tasks.reduce((sum, item) => sum + item.list.length, 0);
            tasks.forEach(task => {
                if (task.type === type) {
                    task.list.unshift({ id: nextId + 1, title: titleInput.value, content: contentInput.value });
                }
            });
            saveTasksToLocalStorage(tasks);
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

const createTaskElement = (type, id, title, content) => {
    console.log(type, title, content);
    const task = document.createElement('li');
    task.className = 'task-item';
    task.draggable = true;
    task.id = `task-${id}`;

    const taskWrapper = document.createElement('div');
    const taskTitle = document.createElement('h3');
    taskTitle.innerText = title;

    const taskContent = document.createElement('p');
    taskContent.innerText = content;

    taskWrapper.appendChild(taskTitle);
    taskWrapper.appendChild(taskContent);

    const btnWrapper = document.createElement('div');
    const editBtn = document.createElement('button');
    const editImg = document.createElement('img');
    editImg.src = '/assets/edit.svg';
    editImg.alt = 'edit';

    editBtn.onclick = () => {
        const list = task.parentElement;
        const taskBox = createTaskBox(type, list, task);
        task.replaceWith(taskBox);
    };
    editBtn.appendChild(editImg);

    const closedBtn = document.createElement('button');
    const closedImg = document.createElement('img');
    closedImg.src = '/assets/closed.svg';
    closedImg.alt = 'closed';

    // TODO: 삭제 모달 추가
    closedBtn.onclick = () => {
        task.remove();
    };
    closedBtn.appendChild(closedImg);

    btnWrapper.appendChild(editBtn);
    btnWrapper.appendChild(closedBtn);

    task.appendChild(taskWrapper);
    task.appendChild(btnWrapper);

    return task;
};
