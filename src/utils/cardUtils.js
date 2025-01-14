import { ColumnCard } from '../components/Card/ColumnCard.js';
import { Modal } from '../components/Modal/Modal.js';
import { Background } from '../layout/Background/Background.js';

export function showCardList(element,cardList){
    const fragment = document.createDocumentFragment();
    cardList.map((item)=>{
        fragment.appendChild(ColumnCard({
            title:item.title,
            type: item.type,
            content: item.content,
            author: item.author,
            editId: 'card-edit-toggle',
            deleteId: 'card-delete-toggle',
            checkId: "card-add",
            closeId: "card-add-toggle",
        
        }))
        
    })
    element.appendChild(fragment);
}

export function addCardToggle({addForm,headerColumn}){
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

export function addCard({titleInput,contentInput,addForm,headerColumn}){
    const title = titleInput.value;
    const content = contentInput.value;
    

    if (title && content) {
        addForm.remove()
        const newCard =ColumnCard({
            title,
            content ,
            author:"author by web" ,                
            editId: 'card-edit',
            deleteId: 'card-delete-toggle',
            closeText:"취소",
            checkId:"삭제"
        })
        headerColumn.insertAdjacentElement('afterend', newCard); 
    }

}

export function deleteCardToggle({app,columnCard}){
    const background =app.querySelector('.background-container');
        if(!background){
            const fragment = document.createDocumentFragment()
            const deleteModal = Modal({
                content: '선택한 카드를 삭제할까요?',
                checkId:'card-delete',
                closeId:'card-delete-toggle',
                closeText:'취소',
                checkText:'삭제'
            })

            fragment.appendChild(Background());  
            fragment.appendChild(deleteModal);  
            columnCard.appendChild(fragment);
        }
        else{
            const modal = columnCard.querySelector('.modal-container'); 
            background.remove();
            modal.remove();
        }
        return;
    
}

export function deleteCard({columnCard}){
    columnCard.remove();
}


let originalTitle = ''; 
let originalContent = '';  

export function editCardToggle({editForm,columnCard}){
    if(!editForm){
        originalTitle = columnCard.querySelector('.column-card-title').textContent;
        originalContent = columnCard.querySelector('.column-card-content').textContent;
        const newForm = ColumnCard({
            type: "edit-card",
            title:originalTitle,
            content:originalContent,
            checkId: "card-edit",
            closeId: "card-edit-toggle",
            addText:"저장",
            closeText: "취소",
        });
        columnCard.insertAdjacentElement('afterend',newForm);
        columnCard.remove()  
    }else{
        const restoredCard = ColumnCard({
            title:originalTitle,
            content:originalContent,
            author: "author by web",
            editId: "card-edit-toggle",
            deleteId: "card-delete-toggle",
        });
        editForm.insertAdjacentElement('afterend',restoredCard);
        editForm.remove()
    }
    return;
}

export function editCard({editForm}){
    if(editForm){
        const newTitle = editForm.querySelector('#card-title').value;
        const newContent = editForm.querySelector('#card-content').value;
        const newForm = ColumnCard({
            title:newTitle,
            content:newContent,
            author: "author by web",
            editId: "card-edit-toggle",
            deleteId: "card-delete-toggle",
        });
        editForm.insertAdjacentElement('afterend',newForm);
        editForm.remove()  
    }
}
