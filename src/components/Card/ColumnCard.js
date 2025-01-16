import { Background } from '../../layout/Background/Background.js';
import { PrimaryModal } from '../../observer/observer.js';
import { loadCss } from '../../utils/loadcss.js';
import { Button } from '../Button/Button.js';
import { Modal } from '../Modal/Modal.js';


export const modalInstances = {};

export function ColumnCard({id,type,title,content,author,addText,closeText,checkId,editId,closeId,deleteId}){
    const columnCard = document.createElement('li');
    columnCard.className = 'column-card-container';
    columnCard.id= id;
    columnCard.innerHTML =`
        <div class='column-content-container'>
            <div class='column-content-box'></div>
        </div>
        
    `
    const contentBox = columnCard.querySelector('.column-content-box');
    const cardContainer = columnCard.querySelector('.column-content-container');

    if(type === 'add-card' ){
        contentBox.innerHTML = `
        <input id="card-title" type='text' placeholder='${title}' class='column-card-title' />
        <input id="card-content" type='text' placeholder='${content}' class='column-card-content' />
        `;
        createCardButtons({columnCard,contentBox,type,closeText,addText,checkId,closeId})

    }
    else if ( type==='edit-card'){
        contentBox.innerHTML = `
        <input id="card-title" type='text' value='${title}' class='column-card-title' />
        <input id="card-content" type='text' value='${content}' class='column-card-content' />
        `;
        createCardButtons({columnCard,contentBox,type,closeText,addText,checkId,closeId})
    }
    else{
        columnCard.draggable="true";
        contentBox.innerHTML = `
            <div class='column-card-title'>${title}</div>
            <div class='column-card-content'>${content}</div>
            <div class='column-card-author'>${author}</div>
        `;
        const iconBox = document.createElement('div');
        iconBox.className = 'column-card-icon-box';
        cardContainer.insertAdjacentElement('afterend', iconBox)

        const editButton = Button({
            type:'icon',
            icon:'edit',
            textColor:'grayscale500',
            id:editId
        })

        const deleteButton = Button({
            type:'icon',
            icon:'close',
            textColor:'grayscale500',
            id:deleteId
        })

        iconBox.insertAdjacentElement('beforeend',editButton);
        iconBox.insertAdjacentElement('beforeend',deleteButton);
            
    }
    if (!modalInstances[id]) {
        modalInstances[id] = new PrimaryModal();
    }

    modalInstances[id].subscribe((isOpen)=>{
        const modal = columnCard.querySelector('.modal-container'); 
        const background = columnCard.querySelector('.background-container'); 
        if(isOpen){    
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
        return
        }else{
            if(background)background.remove();
            if(modal)modal.remove()            
            return
        }
        
    })


    loadCss('../src/components/Card/ColumnCard.css')


    columnCard.addEventListener('dragstart',()=>{
        columnCard.classList.add('card-drag-container');
    })

    columnCard.addEventListener('dragend',()=>{
        columnCard.classList.remove('card-drag-container');
    })

    

    return columnCard;
}


export function createCardButtons({columnCard,contentBox,type,closeText,addText,checkId,closeId}){
    const buttonBox = document.createElement('div');
    buttonBox.className = 'card-button-box';
    columnCard.id=type
    
    const closeButton = Button({
        type:'text',
        text:closeText,
        backgroundColor: 'grayscale100',
        textColor:'grayscale600',
        id : closeId
    })

    const checkButton = Button({
        type:'text',
        text:addText,
        backgroundColor: 'accentBlue',
        textColor:'grayscale50',
        id: checkId
    })

    buttonBox.insertAdjacentElement('beforeend',closeButton);
    buttonBox.insertAdjacentElement('beforeend',checkButton);

    contentBox.insertAdjacentElement('afterend', buttonBox);
}


