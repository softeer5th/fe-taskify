export function addCard(id) {
    const parentElement = document.querySelector('.column-idnum'+id);
    const childElement = parentElement.querySelector("#card-list");

    const newDiv = document.createElement('div');
    newDiv.className = 'new-card';
    newDiv.innerHTML = `
        <div class="card-info">
            <input class="card-title" type="text" placeholder="제목을 입력하세요" />
            <input class="card-content" type="text" placeholder="내용을 입력하세요" />
        </div>
        <div class="action-buttons">
            <button class="cancel-button">
                취소
            </button>
            <div style="width:10px"></div>
            <button class="confirm-button">
                등록    
            </button>
        </div>
    `;
    let newCard = childElement.querySelector('.new-card');
    if (newCard) {
        newCard.remove();
    } else {
        childElement.appendChild(newDiv);
    }
}


export function delCard() {
    console.log("bye");
}
