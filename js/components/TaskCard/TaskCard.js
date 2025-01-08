export default function TaskCard() {
    const taskCard = document.createElement('div');
    taskCard.className = 'task-card';

    const taskCardDetails = document.createElement('div');
    taskCardDetails.classList.add('task-card__details');

    const newTaskTitle = document.createElement('div');
    newTaskTitle.classList = 'task-card__title';
    newTaskTitle.innerText = 'title'
    
    const newTaskContent = document.createElement('div');
    newTaskContent.className = 'task-card__content';
    newTaskContent.innerText = 'content'
    
    taskCardDetails.append(newTaskTitle, newTaskContent);

    taskCard.append(taskCardDetails)
    
    return taskCard;
}

