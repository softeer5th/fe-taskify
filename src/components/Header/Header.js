import { loadCss } from '../../utils/loadcss.js';
import { Chip } from '../Chip/Chip.js';

export function Header(){
    const header = document.createElement('header');
    header.className = "header";
    header.innerHTML = `
      <div class='logo-box'>
        <div class="logo">TASKIFY</div>
      </div>
      <button class="history-btn">
        <img src="./src/assets/icons/history.svg" alt="활동기록">
      </button>
    `;

    const logoBox= header.querySelector('.logo-box')
    const sortChip =Chip({
      iconType: 'arrow',
      iconColor:'grayscale600',
      content: '생성 순',
      id:'createOrder'
    })
    logoBox.insertAdjacentElement('beforeend',sortChip);

    loadCss('../src/components/Header/Header.css')
    return header;
}


