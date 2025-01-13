export let overlay = document.getElementById('overlay');
const alertArea = document.getElementById('alert-area');

export function createDeleteCardAlert(columnId, cardId) {
    const delCardAlertDiv = document.createElement('div');
    delCardAlertDiv.className = 'modal';
    delCardAlertDiv.id = `deleteCardAlert-${columnId}-${cardId}`;
    delCardAlertDiv.innerHTML = `
        <p class="delObj"></p>
        <button id="cancel-delete-card-button" class="modal-cancel-button">취소</button>
        <button id="confirm-delete-card-button" class="modal-confirm-button">확인</button>
    `;
    alertArea.appendChild(delCardAlertDiv);
}

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

export function hideAlert() {
    overlay.style.display = "none";
    alertArea.innerHTML = ``;
}