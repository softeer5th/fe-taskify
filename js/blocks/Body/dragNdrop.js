import { loadTasksFromLocalStorage, saveTasksToLocalStorage } from "../../store/task.js";

const lists = ['todo', 'doing', 'done'];

export const initializeDragAndDrop = () => {
    let originalParentId = null;

    lists.forEach(listId => {
        const list = document.getElementById(`list-${listId}`);

        list.addEventListener('dragstart', (e) => {
            e.target.classList.add('dragging');
            originalParentId = e.target.parentElement.id;
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

                const parentElementId = previousParentId;
                const targetListId = list.id;

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
            }
        });

        list.addEventListener('drop', (e) => {
            e.preventDefault();

            const draggable = document.querySelector('.dragging'); // 드래그 요소
            if (draggable) {
                const targetListId = list.id;

                if (originalParentId !== targetListId) {
                    saveActivity({
                        title: draggable.querySelector('h3').innerText,
                        type: 'move',
                        beforeCategory: originalParentId.split('-')[1],
                        afterCategory: targetListId.split('-')[1]
                    });
                }

                const beforUlElement = document.getElementById(`list-${originalParentId.split('-')[1]}`);
                const AfterUlElement = document.getElementById(`list-${targetListId.split('-')[1]}`);
                beforUlElement.style.height = `${beforUlElement.scrollHeight - 100}px`;
                AfterUlElement.style.height = `${AfterUlElement.scrollHeight + 100}px`;
                
                updateBadgeCount();
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