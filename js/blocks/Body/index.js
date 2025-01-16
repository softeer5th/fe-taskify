import { loadTasksFromJSON, loadTasksFromLocalStorage, saveTasksToLocalStorage } from '../../store/task.js';
import { renderRecords } from '../Header/index.js';
import { Modal } from '../Modal/index.js';
import { initializeDragAndDrop } from './dragNdrop.js';

const lists = ['todo', 'doing', 'done'];

function createSection(containerId, title, tasks) {
    const container = document.querySelector('main');

    const fragment = new DocumentFragment()
    let listCount = 0;
    tasks.filter(task => task.type === containerId).forEach(({ type, list }) => {
        list.forEach(({id, title, content}) => {
            const newTask = createTaskElement(type, id, title, content);

            fragment.appendChild(newTask);
            listCount++;
        });
    }); 

    const section = document.createElement('section');
    section.className = 'bold16';
    section.innerHTML = `
        <div class="menu">
            <div>
                <p>${title}</p>
                <span id=badge-${containerId} class="badge medium12">${listCount}</span>
            </div>
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
        ulElement.style.height = `${ulElement.scrollHeight + 100}px`;
    });

    document.getElementById(`clear-${containerId}`).addEventListener('click', () => {
        clearTasks(containerId);
    });

    ulElement.appendChild(fragment);
    ulElement.style.height = `${ulElement.scrollHeight + 300}px`;
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
    updateBadgeCount();
};

export const DOMLoaded = async () => {
    const tasks = await loadTasksFromJSON();

    createSection('todo', '해야할 일', tasks);
    createSection('doing', '하고 있는 일', tasks);
    createSection('done', '완료한 일', tasks);

    initializeDragAndDrop();
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

const createTaskBox = (type, list, id = null, task = null) => {
    const taskBox = document.createElement('div');
    taskBox.className = 'task-box';

    const titleInput = document.createElement('input');
    titleInput.className = 'bold14';
    titleInput.style.color = '#14142B';
    titleInput.type = 'text';
    titleInput.placeholder = '제목 입력';
    if (task) titleInput.value = task.querySelector('h3').innerText;

    const contentInput = document.createElement('textarea');
    contentInput.placeholder = '내용 입력';
    contentInput.className = 'medium14';
    contentInput.style.color = '#6E7191';
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

            saveActivity({
                title: titleInput.value,
                type: 'edit',
                category: type
            });

            const tasks = loadTasksFromLocalStorage();

            const updatedTasks = tasks.map(task => {
                if (task.type === type) {
                    return {
                        type: task.type,
                        list: task.list.map(t => {
                            if (t.id === id) {
                                t.title = titleInput.value;
                                t.content = contentInput.value;
                            }
                            return t;
                        }
                        )

                    } 
                }
                return task;
            });

            saveTasksToLocalStorage(updatedTasks);
        } else {
            const tasks = loadTasksFromLocalStorage();
            const totalCount = tasks.reduce((sum, item) => sum + item.list.length, 0);
            const newTask = createTaskElement(type, totalCount+1, titleInput.value, contentInput.value);
            list.insertBefore(newTask, list.firstChild);
            taskBox.remove();

            saveActivity({
                title: titleInput.value,
                type: 'add',
                category: type
            });
            const nextId = tasks.reduce((sum, item) => sum + item.list.length, 0);
            tasks.forEach(task => {
                if (task.type === type) {
                    task.list.unshift({ id: nextId + 1, title: titleInput.value, content: contentInput.value });
                }
            });
            saveTasksToLocalStorage(tasks);

            updateBadgeCount();
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

const saveActivity = (activity) => {
    const records = JSON.parse(localStorage.getItem('records') || '[]');
    const timestamp = + new Date();
    const activityWithTimestamp = { ...activity, timestamp };
    records.push(activityWithTimestamp);
    localStorage.setItem('records', JSON.stringify(records));

    renderRecords();
};

export const createTaskElement = (type, id, title, content) => {
    const task = document.createElement('li');
    task.className = 'task-item';
    task.draggable = true;
    task.id = `task-${id}`;

    const taskWrapper = document.createElement('div');
    const taskTitle = document.createElement('h3');
    taskTitle.innerText = title;
    taskTitle.className = 'bold14';
    taskTitle.style.color = '#14142B';

    const taskContent = document.createElement('p');
    taskContent.innerText = content;
    taskContent.className = 'medium14';
    taskContent.style.color = '#6E7191';

    const writer = document.createElement('p');
    writer.innerText = 'author by web';
    writer.className = 'medium12';
    writer.style.color = '#A0A3BD';
    writer.style.marginTop = '10px';

    taskWrapper.appendChild(taskTitle);
    taskWrapper.appendChild(taskContent);
    taskWrapper.appendChild(writer);

    const btnWrapper = document.createElement('div');
    const editBtn = document.createElement('button');
    const editImg = document.createElement('img');
    editImg.src = '/assets/edit.svg';
    editImg.alt = 'edit';

    editBtn.onclick = () => {
        const list = task.parentElement;
        const taskBox = createTaskBox(type, list, id, task);
        task.replaceWith(taskBox);
    };
    editBtn.appendChild(editImg);

    const closedBtn = document.createElement('button');
    const closedImg = document.createElement('img');
    closedImg.src = '/assets/closed.svg';
    closedImg.alt = 'closed';

    closedBtn.onclick = () => {
        const modal = new Modal({
            message: '선택한 카드를 삭제할까요?',
            onDelete: () => {
                task.remove();
                const tasks = loadTasksFromLocalStorage();
                const updatedTasks = tasks.map(t => {
                    if (t.type === type) {
                        t.list = t.list.filter(task => task.id !== id);
                    }
                    return t;
                }).filter(t => t.list.length > 0);
                saveTasksToLocalStorage(updatedTasks);
                saveActivity({
                    title,
                    type: 'delete',
                    category: type
                });

                updateBadgeCount();
                renderRecords();
            }
        });
        modal.open();
    };
    closedBtn.appendChild(closedImg);

    btnWrapper.appendChild(closedBtn);
    btnWrapper.appendChild(editBtn);

    task.appendChild(taskWrapper);
    task.appendChild(btnWrapper);

    return task;
};

const getListCountByType = (type) => {
    const tasks = loadTasksFromLocalStorage();
    return tasks.find(task => task.type === type).list.length;
}

const updateBadgeCount = () => {
    lists.forEach(id => {
        const badge = document.querySelector(`#badge-${id}`);
        
        if (badge) {
            badge.textContent = getListCountByType(id);
        }
    });
};