import { loadCss } from '../../utils/loadcss.js';
import { Badge } from '../Badge/Badge.js';
import { Button } from '../Button/Button.js';

export function ColumnHeader({title,badgeContent,addId,closeId}){
    const columnHeader = document.createElement('div');
    columnHeader.className = "column-header";
    columnHeader.innerHTML = `
    <div class="column-header-container">
        <div class="column-title-container">
          <div class="column-header-title">${title}</div>
        </div>
    </div>
    `;
    

    const plusButton = Button({type:'icon',icon:'plus',backgroundColor:'grayscale100',textColor:"grayscale500",id:addId});
    const closedButton = Button({type:'icon',icon:'close',backgroundColor:'grayscale100',textColor:'grayscale500',id:closeId});

    const columnTitle = columnHeader.querySelector('.column-header-title');
    const titleContainer = columnHeader.querySelector('.column-title-container');
    const badge = Badge(badgeContent);
    
    columnTitle.insertAdjacentElement('afterend', badge);
    titleContainer.insertAdjacentElement('afterend',closedButton);
    titleContainer.insertAdjacentElement('afterend', plusButton);


    loadCss('../src/components/Column/ColumnHeader.css')
    return columnHeader;
}


