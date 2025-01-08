export let element = document.getElementById('overlay');
let alertArea = document.getElementById('alert-area');


const delAllCardAlertDiv = document.createElement('div');
delAllCardAlertDiv.className = 'modal';
delAllCardAlertDiv.id = 'deleteAllCardAlert';
delAllCardAlertDiv.innerHTML = `
    <p class="delObj"></p>
    <button id="cancel-delete-all-button" class="modal-cancel-button">취소</button>
    <button id="confirm-delete-all-button" class="modal-confirm-button">확인</button>
`;


const delCardAlertDiv = document.createElement('div');
delCardAlertDiv.className = 'modal';
delCardAlertDiv.id = 'deleteCardAlert';
delCardAlertDiv.innerHTML = `
    <p class="delObj"></p>
    <button id="cancel-delete-card-button" class="modal-cancel-button">취소</button>
    <button id="confirm-delete-card-button" class="modal-confirm-button">확인</button>
`;


alertArea.appendChild(delAllCardAlertDiv);
alertArea.appendChild(delCardAlertDiv);


export let delAllCardAlert = document.getElementById('deleteAllCardAlert');
export let delCardAlert = document.getElementById('deleteCardAlert');
