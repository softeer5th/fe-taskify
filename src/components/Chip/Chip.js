import { getIconSVG } from '../../utils/iconUtils.js';
import { loadCss } from '../../utils/loadcss.js';

export function Chip(iconType,iconColor,content,eventFuntion){
    const chip = document.createElement('button');
    chip.className = "chip-container";
    chip.innerHTML = getIconSVG(iconType,iconColor)
    chip.insertAdjacentHTML('beforeend', `
        <div class="chip-content">${content}</div>
    `);
    
    chip.addEventListener('click', eventFuntion);

    loadCss('../src/components/chip/chip.css')
    return chip;
}


