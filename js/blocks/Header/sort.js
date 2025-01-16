import { loadTasksFromLocalStorage, saveTasksToLocalStorage } from "../../store/task.js";
import { createTaskElement } from "../Body/index.js";

const lists = ['todo', 'doing', 'done'];

let sortOrder = 'desc';
const changeBtn = document.getElementById('change-btn');
const changeBtnText = document.getElementById('change-btn-text');

export const initializeSort = () => {
    changeBtn.addEventListener('click', () => {
        sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        changeBtnText.textContent = sortOrder === 'asc' ? '생성순' : '최신순';
    
        const tasks = loadTasksFromLocalStorage();
        const sortedTasks = sortTasks(tasks, sortOrder);
        reRenderTasks(sortedTasks, sortOrder);
        saveTasksToLocalStorage(sortedTasks);
    });
}

const sortTasks = (tasks, order) => {
    return tasks.map(taskGroup => ({
        ...taskGroup,
        list: [...taskGroup.list].sort((a, b) => {
            return order === 'asc' ? a.id - b.id : b.id - a.id;
        })
    }));
};

const reRenderTasks = (tasks, order) => {
    lists.forEach(listId => {
        const ulElement = document.getElementById(`list-${listId}`);
        const oldItems = [...ulElement.querySelectorAll('.task-item')];
        
        // 원래 위치 저장
        const positions = oldItems.map(item => {
            const rect = item.getBoundingClientRect();
            return { id: item.id, top: rect.top, left: rect.left };
        });

        ulElement.innerHTML = '';

        const fragment = new DocumentFragment();
        tasks.filter(task => task.type === listId)[0].list.forEach(({id, title, content}) => {
            const newTask = createTaskElement(listId, id, title, content);
            fragment.appendChild(newTask);
        });
        ulElement.appendChild(fragment);

        const newItems = ulElement.querySelectorAll('.task-item');
        newItems.forEach(newItem => {
            const oldPosition = positions.find(pos => pos.id === newItem.id);
            if (oldPosition) {
                const newRect = newItem.getBoundingClientRect();
                const deltaY = oldPosition.top - newRect.top;
                const deltaX = oldPosition.left - newRect.left;

                newItem.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
                newItem.style.transition = 'none';

                requestAnimationFrame(() => {
                    newItem.style.transition = 'transform 0.3s ease-out';
                    newItem.style.transform = 'translate(0, 0)';
                });
            }
        });
    });
};