export default function ModalComponent() {

    // Modal 내부 컴포넌트 템플릿
    function templateChildren({message}) {
        return `
            <p class="text-default display-medium16">${message}</p>
            <span>
                <button class="surface-alt text-default display-bold14 rounded-100" >취소</button>
                <button class="surface-danger text-white-default display-bold14 rounded-100" >삭제</button>
            <span>
        `
    }

    // Modal 컴포넌트 렌더링 함수
    function render(message, handleRemove) {
        const body = document.body;
        const modalElement = renderChildren(message);
        const modal = renderModal(modalElement);

        addListener(modal, handleRemove);

        body.appendChild(modal);
    }

    // Modal 배경 컴포넌트 렌더링 함수
    function renderModal(children) {
            const modal = document.createElement('div');
            modal.setAttribute('id', 'modal');
            modal.appendChild(children);
            return modal;
    }

    // Modal 내부 컴포넌트 렌더링 함수
    function renderChildren(message) {
        const modalChildren = document.createElement('div');
        modalChildren.setAttribute('class', 'surface-default shadow-up rounded-100')
        modalChildren.innerHTML = templateChildren({message});
    
        return modalChildren
    }

    // Modal 닫기 함수
    function closeModal() {
        const modal = document.getElementById('modal');
        modal.parentNode.removeChild(modal);
    }

    // Modal 이벤트 등록 함수
    // handleRemove : Danger 버튼 클릭 callback
    function addListener(modalElement, handleRemove) {
        const [cancelButton, removeButton] = modalElement.getElementsByTagName('button');

        cancelButton.addEventListener('click', closeModal);
        removeButton.addEventListener('click', () => {
            handleRemove();
            closeModal();
        })
    }

    return {render}
}