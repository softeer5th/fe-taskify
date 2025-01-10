import { loadCss } from '../../utils/loadcss.js';
import { Button } from '../Button/Button.js';

export function ColumnCard({type,title,content,author,buttonProps}){
    const columnCard = document.createElement('div');
    columnCard.className = 'column-card-container';
    columnCard.innerHTML =`
        <div class='column-content-container'>
            <div class='column-content-box'>
                <div class='column-card-title'>${title}</div>
                <div class='column-card-content'>${content}</div>
            </div>
        </div>
        
    `
    const contentBox = columnCard.querySelector('.column-content-box');
    const cardContainer = columnCard.querySelector('.column-content-container');

    if(type === 'add' || type === 'edit'){
        const buttonBox = document.createElement('div');
        buttonBox.className = 'card-button-box';

        // 버튼 인자값을 받아 올거임 
        const leftButton = Button({
            type:'text',
            text:'button',
            backgroundColor: 'grayscale100',
            textColor:'grayscale600',
            eventFuntion:()=>{}
        })

        const rightButton = Button({
            type:'text',
            text:'button',
            backgroundColor: 'accentBlue',
            textColor:'grayscale50',
            eventFuntion:()=>{}
        })
        // 여기까지 

        buttonBox.insertAdjacentElement('beforeend',leftButton);
        buttonBox.insertAdjacentElement('beforeend',rightButton);

        contentBox.insertAdjacentElement('afterend', buttonBox);
    }
    else{
        const iconBox = document.createElement('div');
        iconBox.className = 'column-card-icon-box';
        cardContainer.insertAdjacentElement('afterend', iconBox)

        const authorElement = `<div class='column-card-author'>${author}</div>`;
        contentBox.insertAdjacentHTML('afterend', authorElement);
        

        const editButton = Button({
            type:'icon',
            icon:'edit',
            textColor:'grayscale500',
            eventFuntion:()=>{}
        })

        const closedButton = Button({
            type:'icon',
            icon:'close',
            textColor:'grayscale500',
            eventFuntion:()=>{}
        })

        iconBox.insertAdjacentElement('beforeend',editButton);
        iconBox.insertAdjacentElement('beforeend',closedButton);
        if(type === 'drag'){

            columnCard.classList.add('card-drag-container');
        }else if (type === 'place'){
            columnCard.classList.add('card-place-container');
        }
            
    }


   


    loadCss('../src/components/Card/ColumnCard.css')
    return columnCard;
}


