export let overlay = document.getElementById('overlay');

const alertArea = document.getElementById('alert-area');

function deleteHTML(action) {
    return `
    <p class="delObj"></p>
    <button id="cancel-${action}-button" class="modal-cancel-button">취소</button>
    <button id="confirm-${action}-button" class="modal-confirm-button">확인</button>`
};

// 특정 카드 삭제
export function createDeleteCardAlert(cardId) {
    const delCardAlertDiv = document.createElement('div');
    delCardAlertDiv.className = 'modal';
    delCardAlertDiv.id = `deleteCardAlert-${cardId}`;
    delCardAlertDiv.innerHTML = deleteHTML('del-card');
    alertArea.appendChild(delCardAlertDiv);
}

// 칼럼 삭제
export function createDeleteColumnAlert(columnId) {
    const delColumnAlertDiv = document.createElement('div');
    delColumnAlertDiv.className = 'modal';
    delColumnAlertDiv.id = `deleteColumnAlert-${columnId}`;
    delColumnAlertDiv.innerHTML = deleteHTML('del-column');
    alertArea.appendChild(delColumnAlertDiv);
}


// 칼럼 내 카드 전부 삭제
export function createDeleteAllCardAlert(columnId) {
    const delAllCardAlertDiv = document.createElement('div');
    delAllCardAlertDiv.className = 'modal';
    delAllCardAlertDiv.id = `deleteAllCardAlert-${columnId}`;
    delAllCardAlertDiv.innerHTML = deleteHTML('del-all-card');
    alertArea.appendChild(delAllCardAlertDiv);
}


// 알러트창 없애기
export function hideAlert() {
    overlay.style.display = "none";
    alertArea.innerHTML = ``;
}