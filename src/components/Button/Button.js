import { getIconSVG } from '../../utils/iconUtils.js';
import { loadCss } from '../../utils/loadcss.js';
import { colors, setButtonColor } from '../../utils/styleUtils.js';

export function Button({type,text,icon,backgroundColor,textColor,eventFuntion}){
    const primaryButton = document.createElement('button');
    primaryButton.className = "primary-button";
    setButtonColor(primaryButton,backgroundColor,textColor)
    
    switch(type){
        case 'icon':
            primaryButton.innerHTML = getIconSVG(icon,textColor);
            primaryButton.classList.remove('primary-button');
            primaryButton.classList.add('icon-button');
            break;
        case 'text':
            primaryButton.innerHTML = `
                <div class="button-content" style="color: ${colors[textColor]};>${text}</div>
            `;
            break;
        case 'iconText':
            primaryButton.innerHTML =getIconSVG(icon, textColor);
            primaryButton.insertAdjacentHTML('beforeend', `
                <div class="button-content" style="color: ${colors[textColor]}">${text}</div>
            `);
            break;
        default:
            break;
    }
    primaryButton.addEventListener('click', eventFuntion);


    loadCss('../src/components/button/button.css')
    return primaryButton;
}


