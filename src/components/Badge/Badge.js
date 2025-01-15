import { loadCss } from '../../utils/loadcss.js';

export function Badge({model,content}){
    const badge = document.createElement('div');
    badge.className = "badge-container";

    function render(content){
      if(typeof content === 'number' && content>99){
        content='99+'
      }

      badge.innerHTML = `
        <div class="badge-content">${content}</div>
      `;
    }

    render(content);


     model.subscribe((tasks) => {
        render(tasks.length); 
     });
    

    loadCss('../src/components/Badge/Badge.css')
    return badge;
}


