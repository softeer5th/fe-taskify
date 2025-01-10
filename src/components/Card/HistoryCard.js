import { loadCss } from '../../utils/loadcss.js';

export function HistoryCard({username,title,beforeColumn,afterColumn,action,timeStamp}){
    const historyCard = document.createElement('div');
    historyCard.className = 'historyCard-container';
    historyCard.innerHTML =`
        <div class='profile-img'></div>
        <div class='history-content-box'>
            <div class='history-username'>${username}</div>
            <div class='history-content'>
                <span class='strong-content'>${title}</span>
                을(를) <span class='strong-content'>${beforeColumn}</span>
                에서 <span class='strong-content'>${afterColumn}</span>
                으로 <span class='strong-content'>${action}</span>하였습니다.
            </div>
            <div class='history-timestamp'>${timeStamp}</div>
        </div>
        </div>
    `

    loadCss('../src/components/Card/historyCard.css')
    return historyCard;
}


