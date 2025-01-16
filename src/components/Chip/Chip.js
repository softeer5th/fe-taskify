import { getIconSVG } from '../../utils/iconUtils.js';
import { loadCss } from '../../utils/loadcss.js';

export function Chip({iconType,iconColor,content,id}){
    const chip = document.createElement('button');
    chip.className = "chip-container";
    chip.id= id;
    chip.innerHTML = getIconSVG(iconType,iconColor)
    chip.insertAdjacentHTML('beforeend', `
        <div class="chip-content">${content}</div>
    `);
    

    loadCss('../src/components/chip/chip.css')
    return chip;
}


