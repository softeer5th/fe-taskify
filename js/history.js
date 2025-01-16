import { renderTemplate } from "./main.js";
import { getHistory } from "./store.js";

const openHistoryButton = document.getElementById('history-button');
const closeHistoryButton = document.querySelector('.close-history');
const dialog = document.getElementById('history-dialog');

openHistoryButton.addEventListener('click', (event) => {showHistory()});
closeHistoryButton.addEventListener('click', (event)=> {
    dialog.classList.toggle('visible');
});


function showHistory() {
    dialog.classList.toggle('visible'); // 클릭 시 토글

    // 버튼의 위치 정보 가져오기
    const buttonRect = openHistoryButton.getBoundingClientRect();

    // 다이얼로그 위치 계산 (버튼 아래에 표시)
    const dialogWidth = dialog.offsetWidth;
    const dialogX = buttonRect.right - dialogWidth; // 버튼의 오른쪽 위치
    const dialogY = buttonRect.bottom + window.scrollY; // 버튼의 하단 위치 + 스크롤 값

    dialog.style.left = `${dialogX}px`;
    dialog.style.top = `${dialogY}px`;
    console.log(getHistory());
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
    //templateFile, templateId, targetId, props
    console.log(historyObj);
    await renderTemplate('./html/history_template.html', 'history-template', 'history-area', historyObj, true);
    console.log(historyObj.actionType)
    if (historyObj.actionType==="등록" || historyObj.actionType==="삭제") {
        document.querySelector('.detail').innerHTML = `
        <span class="accent">${historyObj.subject}</span>을(를)&nbsp;
        <span class="accent">${historyObj.from}</span>에서&nbsp;
        <span class="accent">${historyObj.actionType}</span>하였습니다.
        `;
    } else if (historyObj.actionType==="변경") {
        document.querySelector('.detail').innerHTML = `
        <span class="accent">${historyObj.subject}</span>을(를)&nbsp;
        <span class="accent">${historyObj.actionType}</span>하였습니다.
        `;
    } else if (historyObj.actionType==="이동") {
        document.querySelector('.detail').innerHTML = `
        <span class="accent">${historyObj.subject}</span>을(를)&nbsp;
        <span class="accent">${historyObj.from}</span>에서&nbsp;
        <span class="accent">${historyObj.to}</span>으로&nbsp;
        <span class="accent">${historyObj.actionType}</span>하였습니다.
        `;
    }
}