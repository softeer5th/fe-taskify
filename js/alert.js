export let overlay = document.getElementById('overlay');
const alertArea = document.getElementById('alert-area');


// 특정 카드 삭제
export function createDeleteCardAlert(cardId) {
    const delCardAlertDiv = document.createElement('div');
    delCardAlertDiv.className = 'modal';
    delCardAlertDiv.id = `deleteCardAlert-${cardId}`;
    delCardAlertDiv.innerHTML = `
        <p class="delObj"></p>
        <button id="cancel-delete-card-button" class="modal-cancel-button">취소</button>
        <button id="confirm-delete-card-button" class="modal-confirm-button">확인</button>
    `;
    alertArea.appendChild(delCardAlertDiv);
}


// 칼럼 내 카드 전부 삭제
export function createDeleteAllCardAlert(columnId) {
    const delAllCardAlertDiv = document.createElement('div');
    delAllCardAlertDiv.className = 'modal';
    delAllCardAlertDiv.id = `deleteAllCardAlert-${columnId}`;
    delAllCardAlertDiv.innerHTML = `
        <p class="delObj"></p>
        <button id="cancel-delete-all-button" class="modal-cancel-button">취소</button>
        <button id="confirm-delete-all-button" class="modal-confirm-button">확인</button>
    `;
    alertArea.appendChild(delAllCardAlertDiv);
}


// 알러트창 없애기
export function hideAlert() {
    overlay.style.display = "none";
    alertArea.innerHTML = ``;
}