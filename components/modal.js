export default function Modal(children) {
    const modal = document.createElement('div');
    modal.setAttribute('id', 'modal');
    modal.appendChild(children);
    return modal;
}