import { loadCss } from '../../utils/loadcss.js';
import { Button } from '../Button/Button.js';

export function ColumnCard({type,title,content,author,addText,closeText,checkId,editId,closeId,deleteId}){
    const columnCard = document.createElement('div');
    columnCard.className = 'column-card-container';
    columnCard.innerHTML =`
        <div class='column-content-container'>
            <div class='column-content-box'></div>
        </div>
        
    `
    const contentBox = columnCard.querySelector('.column-content-box');
    const cardContainer = columnCard.querySelector('.column-content-container');

    if(type === 'add-card' || type === 'edit-card'){
        contentBox.innerHTML = `
        <input id="card-title" type='text' placeholder='${title}' class='column-card-title' />
        <input id="card-content" type='text' placeholder='${content}' class='column-card-content' />
        `;

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
    else{
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
        if(type === 'drag'){
            columnCard.classList.add('card-drag-container');
        }else if (type === 'place'){
            columnCard.classList.add('card-place-container');
        }
            
    }


   


    loadCss('../src/components/Card/ColumnCard.css')
    return columnCard;
}


