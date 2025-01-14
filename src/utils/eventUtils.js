import { ColumnCard } from '../components/Card/ColumnCard.js';
import { Modal } from '../components/Modal/Modal.js';
import { Background } from '../layout/Background/Background.js';
import { addCard, addCardToggle } from './cardUtils.js';

export function handleEventListener(e) {
    const app =document.querySelector('#app')
    const target = e.target;
    const parentColumn = target.closest('.column-box');
    const headerColumn =parentColumn.querySelector('.column-header')
    
    // card 
    const columnCard= target.closest('.column-card-container');
    const addForm = parentColumn.querySelector("#add-card");
    const titleInput = parentColumn.querySelector("#card-title");
    const contentInput = parentColumn.querySelector("#card-content");

    if (target.closest('#history-toggle')) {
        return;
    }

    else if (target.closest('#history-delete-toggle')) {
        return;   
    }

    else if (target.closest('#history-delete')) {
        return;   
    }

    else if (target.closest('#card-add-toggle')) {    
        addCardToggle({addForm,headerColumn});
        return;
    }

    else if (target.closest('#card-close-toggle')) {
        return;
    }

    else if (target.closest('#card-add')) {
        addCard({titleInput,contentInput,addForm,headerColumn});
        return;
    }
    else if (target.closest('#card-delete-toggle')) {
        return;
    }

    else if (target.closest('#card-delete')) {
        return;
    }

    else if (target.closest('#card-edit-toggle')) {
        return;
    }

    else if (target.closest('#card-edit')) {
    
    }
}