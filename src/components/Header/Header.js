import { loadCss } from '../../utils/loadcss.js';

export function Header(){
    const header = document.createElement('header');
    header.className = "header";
    header.innerHTML = `
      <div class="logo">TASKIFY</div>
      <button class="history-btn">
        <img src="./src/assets/icons/history.svg" alt="활동기록">
      </button>
    `;

    loadCss('../src/components/Header/Header.css')
    return header;
}


