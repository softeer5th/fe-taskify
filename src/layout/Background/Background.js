import { loadCss } from '../../utils/loadcss.js';


export function Background(){
    const background = document.createElement('div');
    background.className = 'background-container';

    loadCss('../src/layout/Background/Background.css')
    return background;
}


