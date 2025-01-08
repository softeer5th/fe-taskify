import Button from "../Button/Button.js";
import createImg from "../../utils/createImg.js";

export default function Header() {
    const header = document.createElement('header');
    header.classList.add('header');

    const headerTitle = document.createElement('div');
    headerTitle.classList.add('header__title', 'display-bold24');
    headerTitle.textContent = 'TASKFY';
    
    const historyClickHandler = () => {
        console.log('History button clicked!');
    };
   
    const historyButton = Button({
        type: 'button',
        size: 'midium',
        format: 'icon',
        style: 'default',
        disabled: false,
        onClick: historyClickHandler,
        children: createImg({
            src: '/assets/icons/clock.svg',
            alt: 'history icon'
        }),
    });

    header.append(headerTitle, historyButton);

    return header;
}