
import { ColumnCard, modalInstances } from '../components/Card/ColumnCard.js';
import {  doneModel, progressModel, todoModel } from './mockup.js';

export function showCardList(element,cardList){
    while (element.firstChild) {
        element.removeChild(element.firstChild);
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

export function addCardToggle({addForm,cardColumn}){
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
        
        cardColumn.insertAdjacentElement('afterBegin', newForm); 
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
    const cardId=Number(columnCard.id)
    const [model, columnSort] = handleColumn(columnName);
    model.deleteTask(cardId)
        
    const newData = {...tasksData,[columnSort]:model.tasks}
    localStorage.setItem('tasks',JSON.stringify(newData)) ;  

    modalInstances[cardId].toggle()
}


let originalTitle = ''; 
let originalContent = '';  
let cardId = 0;

export function editCardToggle({editForm,columnCard}){
    if(!editForm){
        cardId  =columnCard.id
        originalTitle = columnCard.querySelector('.column-card-title').textContent;
        originalContent = columnCard.querySelector('.column-card-content').textContent;
        const newForm = ColumnCard({
            id:cardId,
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
            id : cardId,
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

export function editCard({editForm,columnName,tasksData}){
    if(editForm){
        const newTitle = editForm.querySelector('#card-title').value;
        const newContent = editForm.querySelector('#card-content').value;
        const editCard = {
            id : Number(cardId),
            title:newTitle,
            content:newContent,
            author: "author by web",
            editId: "card-edit-toggle",
            deleteId: "card-delete-toggle",
        
        }
    
        const [model, columnSort] = handleColumn(columnName);
        model.editTask(editCard);
        
        const newData = {...tasksData,[columnSort]:model.tasks}
        localStorage.setItem('tasks',JSON.stringify(newData)) ; 

        
    }
}

export function createOrder({chipContainer,tasksData}){
    chipContainer.id='createOrder';
    const chipContent=chipContainer.querySelector('.chip-content')
    chipContent.textContent= '생성 순';
    sortCardsWithAnimation("createOrder")
    const sortedTaskData = sortDataById(tasksData,"createOrder")
    localStorage.setItem("tasks",JSON.stringify(sortedTaskData))

}

export function latestOrder({chipContainer,tasksData}){
    chipContainer.id='latestOrder';
    const chipContent=chipContainer.querySelector('.chip-content')
    chipContent.textContent= '최신 순';
    sortCardsWithAnimation("latestOrder");
    const sortedTaskData = sortDataById(tasksData,"latestOrder");
    localStorage.setItem("tasks",JSON.stringify(sortedTaskData))
    
    
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

export function sortCardsWithAnimation(type) {
    const columns = document.querySelectorAll('.column-card-box'); 

    //각각의 컬럼들
    columns.forEach((column) => {
        const cards = Array.from(column.children);
        const columnBox =column.closest('.column-box')
        const [model, columnSort] = handleColumn(columnBox.id);
        let sortedCards=[]
        
        if(type==='latestOrder'){
            sortedCards = cards.sort((a,b)=> a.id-b.id);
        }
        else{
            sortedCards = cards.sort((a,b)=> b.id-a.id)
        }
        
        

         let accumulatedHeight = column.offsetTop; // 누적 높이를 추적
         sortedCards.forEach((sortedCard) => {
             const originalCard = cards.find((card) => card.id === sortedCard.id); // 현재 카드의 위치
             const currentTop = originalCard.offsetTop; //현재 카드의  y축 위치
             const targetTop = accumulatedHeight; // 목표 y축 위치는 누적 높이
             
             const translateY = targetTop - currentTop;

             originalCard.style.transition = "transform 0.3s ease";
             originalCard.style.transform = `translateY(${translateY}px)`;
 
             accumulatedHeight += originalCard.offsetHeight + 10;
 
         });

         model.sortTask(type);
    })
    
}


export function sortDataById(data,type) {
    const sortedData = {};

    Object.keys(data).forEach((key) => {
        sortedData[key] = [...data[key]].sort((a, b) => {
            return type === 'latestOrder' ? a.id - b.id : b.id - a.id;
        });
    });

    return sortedData;
}
