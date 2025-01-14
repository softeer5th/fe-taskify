import { ColumnCard } from '../components/Card/ColumnCard.js';

export function handleEventListener(e) {
    const target = e.target;
    const parentColumn = target.closest('.column-box');
    const headerColumn =parentColumn.querySelector('.column-header')
    const addForm = parentColumn.querySelector("#add-card");

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
        if (addForm) {
            addForm.remove();
        } else {
            const newForm = ColumnCard({
                type: "add-card",
                title: "제목을 입력하세요.",
                content: "내용을 입력하세요",
                checkId: "card-add",
                closeId: "card-add-toggle",
                addText:"등록",
                closeText: "취소",
            });
            
            headerColumn.insertAdjacentElement('afterend', newForm); 
        }
        return;
    }

    else if (target.closest('#card-close-toggle')) {
        if (addForm) {
            addForm.remove();
        }
        return;
    }

    else if (target.closest('#card-add')) {
        const titleInput = parentColumn.querySelector("#card-title");
        const contentInput = parentColumn.querySelector("#card-content");
        
        const title = titleInput.value;
        const content = contentInput.value;

        if (title && content) {
            addForm.remove()
            const newCard =ColumnCard({
                title,
                content ,
                author:"author by web" ,                
                editId: 'card-edit',
                deleteId: 'card-delete',
            })
        
            headerColumn.insertAdjacentElement('afterend', newCard); 
            
            
        }
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