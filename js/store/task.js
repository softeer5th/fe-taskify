export const saveTasksToLocalStorage = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

export const loadTasksFromLocalStorage = () => {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [{ type: 'todo', list: [] }, { type: 'doing', list: [] }, { type: 'done', list: [] }];
};

export async function loadTasksFromJSON () {
    const tasks = loadTasksFromLocalStorage();
    return tasks;
};
