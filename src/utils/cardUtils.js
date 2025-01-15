
import { ColumnCard, modalInstances } from '../components/Card/ColumnCard.js';
import {  doneModel, progressModel, todoModel } from './mockup.js';

export function showCardList(element,cardList){

    //여기서 추가를하는게 아니라 삭제를 해야함 그걸 어떻게 해야할지 고민 
    while (element.children.length > 1) {
        element.removeChild(element.lastChild);
    }

    const fragment = document.createDocumentFragment();
    cardList.map((item)=>{
        fragment.appendChild(ColumnCard({
            id : item.id,
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

export function addCard({titleInput,contentInput,addForm,columnName,tasksData}){
    const title = titleInput.value;
    const content = contentInput.value;
    

    if (title && content) {
        addForm.remove()
        const newTodo ={
            id:Date.now(),
            title,
            content ,
            author:"author by web" ,                
            editId: 'card-edit',
            deleteId: 'card-delete-toggle',
            closeText:"취소",
            checkId:"삭제"
        }
        const [model, columnSort] = handleColumn(columnName);
        model.addTask(newTodo)
        
        const newData = {...tasksData,[columnSort]:model.tasks}
        localStorage.setItem('tasks',JSON.stringify(newData)) ;  
    }
    return;

}

export function deleteCardToggle({columnCard}){
    const cardId=columnCard.id
    modalInstances[cardId].toggle()

    return;

}

export function deleteCard({columnCard,columnName,tasksData}){
    const cardId=columnCard.id
    const [model, columnSort] = handleColumn(columnName);
    model.deleteTask(cardId)
        
    const newData = {...tasksData,[columnSort]:model.tasks}
    localStorage.setItem('tasks',JSON.stringify(newData)) ;  


    modalInstances[cardId].toggle()
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

export function handleColumn(columnName) {
    if (columnName === 'todo-column') {
        return [todoModel, 'todos'];
    } else if (columnName === 'in-progress-column') {
        return [progressModel, 'progress'];
    } else if (columnName === 'done-column') {
        return [doneModel, 'done'];
    }
}