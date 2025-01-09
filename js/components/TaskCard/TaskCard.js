import Button from "../Button/Button.js";
import createImg from "../../utils/createImg.js";

export default function TaskCard({id = 1}) {
    const deleteBtnClickHandler = () => {
        console.log('delete button clicked');
        taskCard.remove();
    }

    const editBtnClickHandler = () => {
        console.log('edit button clicked');
    }
    const taskCard = document.createElement('div');
    taskCard.className = 'task-card';

    const taskCardDetails = document.createElement('div');
    taskCardDetails.classList.add('task-card__details');

    const taskCardTitle = document.createElement('div');
    taskCardTitle.classList.add('task-card__title', 'display-bold14', 'text-strong');
    taskCardTitle.innerText = `title ${id}`;
    
    const TaskCardContent = document.createElement('div');
    TaskCardContent.classList.add('task-card__content', 'display-medium14', 'text-default');
    TaskCardContent.innerText = `content ${id}`

    const taskCardButtons = document.createElement('div');
    taskCardButtons.classList.add('task-card__buttons');

    const deleteButton = Button({
        format: 'icon',
        onClick: deleteBtnClickHandler,
        children: createImg({
            src: '/assets/icons/closed.svg',
            alt: 'delete button' 
        }),
    });

    const editButton = Button({
        format: 'icon',
        onClick: editBtnClickHandler,
        children: createImg({
            src: '/assets/icons/edit.svg',
            alt: 'edit button'
        }),
    });

    taskCardDetails.append(taskCardTitle, TaskCardContent);
    taskCardButtons.append(deleteButton, editButton);
    taskCard.append(taskCardDetails, taskCardButtons);
    
    return taskCard;
}

