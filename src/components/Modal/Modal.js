import { loadCss } from '../../utils/loadcss.js';
import { Button } from '../Button/Button.js';

export function Modal({content,buttonProps}){
    const modal = document.createElement('div');
    modal.className = 'modal-container';
    modal.innerHTML =`
    <div class='modal-content'>${content} </div>
    `
    
    const buttonBox = document.createElement('div');
    buttonBox.className = 'card-button-box';

    // 버튼 인자값을 받아 올거임 
    
    const leftButton = Button({
        type:'text',
        text:'button',
        backgroundColor: 'grayscale100',
        textColor:'grayscale600',

    })

    const rightButton = Button({
        type:'text',
        text:'button',
        backgroundColor: 'accentRed',
        textColor:'grayscale50',
    })
    // 여기까지 
    
    buttonBox.insertAdjacentElement('beforeend',leftButton);
    buttonBox.insertAdjacentElement('beforeend',rightButton);

    modal.insertAdjacentElement('beforeend', buttonBox);            
    


    

    loadCss('../src/components/Modal/Modal.css')
    return modal;
}


