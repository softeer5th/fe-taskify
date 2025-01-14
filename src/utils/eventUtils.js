import { ColumnCard } from '../components/Card/ColumnCard.js';
import { addCard, addCardToggle, deleteCard, deleteCardToggle, editCard, editCardToggle } from './cardUtils.js';




export function handleEventListener(e) {
    const app =document.querySelector('#app')
    const target = e.target;
    // 각각의 Column
    const parentColumn = target.closest('.column-box');
    // 컬럼의 header
    const headerColumn =parentColumn.querySelector('.column-header')
    
    // card 
    const columnCard= target.closest('.column-card-container');
    // 카드 추가 card
    const addForm = parentColumn.querySelector("#add-card");
    // 카드 추가 title
    const titleInput = parentColumn.querySelector("#card-title");
    // 카드 추가 content
    const contentInput = parentColumn.querySelector("#card-content");
    // 카드 수정 card
    const editForm =parentColumn.querySelector("#edit-card")



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
        deleteCardToggle({app,columnCard});
        return;
    }

    else if (target.closest('#card-delete')) {
        deleteCard({columnCard});
        return;
    }

    else if (target.closest('#card-edit-toggle')) {
        editCardToggle({editForm,columnCard});
        return;
    }

    else if (target.closest('#card-edit')) {
        editCard({editForm});
        return;
    }
}