import { loadCss } from '../../utils/loadcss.js';

export function Badge(content){
    const badge = document.createElement('div');
    badge.className = "badge-container";

    if(typeof content === 'number' && content>99){
        content='99+'
    }

    badge.innerHTML = `
      <div class="badge-content">${content}</div>
    `;

    loadCss('../src/components/Badge/Badge.css')
    return badge;
}


