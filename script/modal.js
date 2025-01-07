const deleteTaskModal = `
    <div>
        <button>삭제</button>
    </div>
`

export function createModalChildren(message, onClick) {
    const modalChildren = document.createElement('div');
    modalChildren.setAttribute('class', 'surface-default shadow-up rounded-100')
    modalChildren.innerHTML = `
        <p class="text-default display-medium16">${message}</p>
        <span>
            <button class="surface-alt text-default display-bold14 rounded-100" >취소</button>
            <button class="surface-danger text-white-default display-bold14 rounded-100" >삭제</button>
        <span>
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