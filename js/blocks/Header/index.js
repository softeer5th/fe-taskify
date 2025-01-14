export const toggleClockBtn = () => {
    const clockBtn = document.querySelector('#clock-btn');
    const activityList = document.querySelector('.activity__list');
    clockBtn.addEventListener('click', (e) => {
        activityList.classList.toggle('clock__toggle');
    });
}

export const renderRecords = () => {
    const recordsFromStorage = JSON.parse(localStorage.getItem('records')) || [];

    const activityList = document.querySelector('.activity__list');
    recordsFromStorage.forEach((record, index) => {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';

        const taskContent = document.createElement('div');
        taskContent.textContent = `${record.title} (${record.beforeCategory} → ${record.afterCategory})`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';

        taskItem.appendChild(taskContent);
        taskItem.appendChild(deleteButton);
        activityList.appendChild(taskItem);
    });
}
