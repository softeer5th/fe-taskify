
export default function Header() {
    const header = document.createElement('header');
    header.classList.add('header');

    const headerTitle = document.createElement('div');
    headerTitle.classList.add('header__title', 'display-bold24');
    headerTitle.textContent = 'TASKFY';
    
    const historyButton = document.createElement('button');
    historyButton.classList.add('header__button', 'button--history');

    const historyIcon = document.createElement('img');
    historyIcon.src = '/assets/icons/clock.svg';
    historyIcon.alt = 'history icon';

    historyButton.appendChild(historyIcon);
    header.append(headerTitle, historyButton);

    return header;
}
