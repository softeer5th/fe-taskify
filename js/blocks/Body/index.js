import { Modal } from '../Modal/index.js';

const lists = ['todo', 'doing', 'done'];

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

    const fragment = new DocumentFragment()
    let listCount = 0;
    tasks.filter(task => task.type === containerId).forEach(({ type, list }) => {
        list.forEach(({id, title, content}) => {
            const newTask = createTaskElement(type, id, title, content);
            // newTask.style.order = sortOrder === 'asc' ? id : -id;

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
        ulElement.style.height = `${ulElement.scrollHeight + 300}px`;
    });

    document.getElementById(`clear-${containerId}`).addEventListener('click', () => {
        clearTasks(containerId);
    });

    ulElement.appendChild(fragment);
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

const initializeDragAndDrop = () => {

    lists.forEach(listId => {
        const list = document.getElementById(`list-${listId}`);

        list.addEventListener('dragstart', (e) => {
            e.target.classList.add('dragging');
        });

        list.addEventListener('dragend', (e) => {
            e.target.classList.remove('dragging');
        });

        list.addEventListener('dragover', (e) => {
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

                const parentElementId = previousParentId;
                const targetListId = list.id;

                // console.log(parentElementId, targetListId); // 기존의 섹션 id, 이동된 섹션 id
                // console.log('draggable', draggable); // 이동된 요소 id
                // console.log('item', e.target); // drop된 위치 (ul, li 둘 중 하나)
                
                const tasks = loadTasksFromLocalStorage();
                const draggableId = parseInt(draggable.id.split('-')[1]);
                const draggableTitle = draggable.querySelector('h3').innerText;
                const draggableContent = draggable.querySelector('p').innerText;

                const updatedTasks = tasks.map(task => {
                    // 기존 섹션에서 삭제
                    if (task.type === parentElementId.replace('list-', '')) {
                        task.list = task.list.filter(t => t.id !== draggableId);
                    }

                    // 이동된 섹션에서 추가
                    if (task.type === targetListId.replace('list-', '')) {
                        const newTask = { id: draggableId, title: draggableTitle, content: draggableContent };
                        if (afterElement) {
                            const afterElementId = parseInt(afterElement.id.split('-')[1]);
                            const afterElementIndex = task.list.findIndex(t => t.id === afterElementId);
                            task.list.splice(afterElementIndex, 0, newTask);
                        } else {
                            task.list.push(newTask);
                        }
                    }

                    return task;
                });

                saveTasksToLocalStorage(updatedTasks);
                updateBadgeCount();
            }
        });

        list.addEventListener('drop', (e) => {
            e.preventDefault();
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

const createTaskElement = (type, id, title, content) => {
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

    taskWrapper.appendChild(taskTitle);
    taskWrapper.appendChild(taskContent);

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
                
                updateBadgeCount();
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
        console.log(badge);
        
        if (badge) {
            badge.textContent = getListCountByType(id);
        }
    });
};

const changeBtn = document.getElementById('change-btn');
const changeBtnText = document.getElementById('change-btn-text');
let sortOrder = 'asc';

changeBtn.addEventListener('click', () => {
    sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    changeBtnText.textContent = sortOrder === 'asc' ? '생성순' : '최신순';

    const tasks = loadTasksFromLocalStorage();
    tasks.forEach(task => {
        task.list.forEach((item, index) => {
            const taskElement = document.getElementById(`task-${item.id}`);
            if (taskElement) {
                // taskElement.style.order = sortOrder === 'asc' ? item.id : -item.id;
            }
        });
    });
});