import { renderTemplate } from "./main.js";
import { clearHistory, getHistory, saveData } from "./store.js";
import { calTimePassed } from "./utility.js";

const openHistoryButton = document.getElementById('history-button');
const closeHistoryButton = document.querySelector('.close-history');
const dialog = document.getElementById('history-dialog');

openHistoryButton.addEventListener('click', (event) => {showHistory()});
closeHistoryButton.addEventListener('click', (event)=> {
    dialog.classList.toggle('visible');
});


function showHistory() {
    dialog.classList.toggle('visible'); // 클릭 시 토글
    updateTime();

    // 버튼의 위치 정보 가져오기
    const buttonRect = openHistoryButton.getBoundingClientRect();

    // 다이얼로그 위치 계산 (버튼 아래에 표시)
    const dialogWidth = dialog.offsetWidth;
    const dialogX = buttonRect.right - dialogWidth; // 버튼의 오른쪽 위치
    const dialogY = buttonRect.bottom + window.scrollY; // 버튼의 하단 위치 + 스크롤 값

    dialog.style.left = `${dialogX}px`;
    dialog.style.top = `${dialogY}px`;
}

export function toggleContentExist() {
    const historyArea = document.getElementById('history-area');
    const hasChildren = historyArea.querySelectorAll('.history-li').length > 0;
    historyArea.setAttribute('data-has-children', hasChildren);
}

export function relocateHistory() {// 버튼의 위치 정보 가져오기
    const buttonRect = openHistoryButton.getBoundingClientRect();

    // 다이얼로그 위치 계산 (버튼 아래에 표시)
    const dialogWidth = dialog.offsetWidth;
    const dialogX = buttonRect.right - dialogWidth; // 버튼의 오른쪽 위치
    const dialogY = buttonRect.bottom + window.scrollY; // 버튼의 하단 위치 + 스크롤 값

    dialog.style.left = `${dialogX}px`;
    dialog.style.top = `${dialogY}px`;
}

export function updateTime() {
    document.querySelectorAll('.record-time').forEach((timeElement)=>{
        const storedDate = new Date(timeElement.getAttribute('data-date'));
        const passedTime = calTimePassed(new Date(), storedDate);
        timeElement.textContent = passedTime;
    })
}

/**
 * 
 * @param {'등록', '변경', '이동', '삭제'} actionType 
 * @param {string} subject 
 * @param {string} from 
 * @param {string} to 
 * @returns 
 */
export function makeHistoryObj(actionType, subject, from, to) {
    return {
        "actionType": actionType,
        "subject": subject,
        "from": from,
        "to": to,
        "time":new Date()
    };
}


export async function renderHistory(historyObj) {
    const historyArea = document.getElementById('history-area');
    if (historyArea.getAttribute('data-has-children')==="true") {
        const divider = document.createElement('hr');
        divider.style.border = '1px solid #EFF0F6';
        historyArea.prepend(divider);
    }
    await renderTemplate('./html/history_template.html', 'history-template', 'history-area', historyObj, true);
    const detail = document.querySelector('.detail');
    if (historyObj.actionType==="등록" || historyObj.actionType==="삭제") {
        detail.innerHTML = `
        <span class="accent">${historyObj.subject}</span>을(를)  
        <span class="accent">${historyObj.from}</span>에서&nbsp  
        <span class="accent">${historyObj.actionType}</span>하였습니다.
        `;
    } else if (historyObj.actionType==="변경") {
        detail.innerHTML = `
        <span class="accent">${historyObj.subject}</span>을(를)  
        <span class="accent">${historyObj.actionType}</span>하였습니다.
        `;
    } else if (historyObj.actionType==="이동") {
        detail.innerHTML = `
        <span class="accent">${historyObj.subject}</span>을(를)  
        <span class="accent">${historyObj.from}</span>에서  
        <span class="accent">${historyObj.to}</span>으로  
        <span class="accent">${historyObj.actionType}</span>하였습니다.
        `;
    }
}

export function cleanHistoryData() {
    clearHistory();
    let historyArea = document.getElementById('history-area');
    historyArea.innerHTML = `<div class="no-history">사용자 활동 기록이 없습니다.</div>`;
    historyArea.setAttribute('data-has-children', false);
    saveData();
}