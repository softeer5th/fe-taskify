import { loadCss } from '../../utils/loadcss.js';
import { Button } from '../Button/Button.js';
import { HistoryCard } from '../Card/HistoryCard.js';

export function HistoryModal({title,content,buttonProps,historyData}){
    const historyModal = document.createElement('div');
    historyModal.className = 'history-modal-container';
    historyModal.innerHTML =`
    <header class='history-modal-header'> 
        <div class='history-modal-title'>${title}</div>
        <div class='history-button-box'></div>
    </header>
    <div class='history-modal-content-box'>
    
    </div>
    `

    const historyContentBox=historyModal.querySelector('.history-modal-content-box');

    // 만약 historydata가 없다면
    if(!historyData || historyData.length === 0){
        const contentElement = `<div class='history-content'>${content}</div>`;
        historyContentBox.insertAdjacentHTML('afterbegin', contentElement)

    }

    // 만약 historydata가 있다면 
    else {
        const historyCards = historyData
            .map((item) => HistoryCard(item).outerHTML) 
            .join(''); 
        historyContentBox.insertAdjacentHTML('afterbegin', historyCards);


        const historyFooter = `<footer class='history-footer-box'>
            <button class='history-delete-button'>기록 전체 삭제</button>
        </footer>`;

        historyModal.insertAdjacentHTML('beforeend', historyFooter)

    }
    



    // 버튼 인자값을 받아 올거임 
    const closedModalButton = Button({
        type:'iconText',
        text:'닫기',
        icon:'close',
        textColor:'grayscale600',
        eventFuntion:()=>{}
    })




    const closedButtonBox=historyModal.querySelector('.history-button-box')
    closedButtonBox.insertAdjacentElement('beforeend',closedModalButton);


    

    loadCss('../src/components/Modal/HistoryModal.css')
    return historyModal;
}


