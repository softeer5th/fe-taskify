import { addCard, addCardToggle, deleteCard, deleteCardToggle, editCard, editCardToggle } from './cardUtils.js';
import { loadLocalStorage } from './mockup.js';




export function handleEventListener(e) {
    const app =document.querySelector('#app')
    const target = e.target;
    // 각각의 Column
    const parentColumn = target.closest('.column-box');
    // 각 컬럼의 이름
    const columnName = parentColumn.id

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



    const tasksData = loadLocalStorage()

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
        addCard({titleInput,contentInput,addForm,headerColumn,columnName,tasksData});
        return;
    }
    else if (target.closest('#card-delete-toggle')) {
        deleteCardToggle({columnCard});
        return;
    }

    else if (target.closest('#card-delete')) {
        deleteCard({columnCard,columnName,tasksData});
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