import { loadCss } from '../../utils/loadcss.js';
import { Button } from '../Button/Button.js';

export function Modal({content,closeId,checkId,closeText,checkText}){
    const modal = document.createElement('div');
    modal.className = 'modal-container';
    modal.innerHTML =`
    <div class='modal-content'>${content} </div>
    `
    
    const buttonBox = document.createElement('div');
    buttonBox.className = 'card-button-box';

    // 버튼 인자값을 받아 올거임 

    const closeButton = Button({
        type:'text',
        text:closeText,
        backgroundColor: 'grayscale100',
        textColor:'grayscale600',
        id : closeId
    })

    const checkButton = Button({
        type:'text',
        text:checkText,
        backgroundColor: 'accentRed',
        textColor:'grayscale50',
        id: checkId
    })

    
    
    buttonBox.insertAdjacentElement('beforeend',closeButton);
    buttonBox.insertAdjacentElement('beforeend',checkButton);

    modal.insertAdjacentElement('beforeend', buttonBox);            
    


    

    loadCss('../src/components/Modal/Modal.css')
    return modal;
}


