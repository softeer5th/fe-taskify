const deleteTaskModal = `
    <div>
        <button>삭제</button>
    </div>
`

export function createModalChildren(message, onClick) {
    const modalChildren = document.createElement('div');
    modalChildren.innerHTML = `
        <p>${message}</p>
        <button>취소</button>
        <button>삭제</button>
    `

    const buttons = modalChildren.getElementsByTagName('button');
    buttons[0].addEventListener('click', closeModal);
    buttons[1].addEventListener('click', () => {
        onClick();
        closeModal();
    })

    return modalChildren
}

export function closeModal() {
    const modal = document.getElementById('modal');
    modal.parentNode.removeChild(modal);
}