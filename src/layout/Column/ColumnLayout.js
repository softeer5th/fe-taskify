import { loadCss } from '../../utils/loadcss.js'

export function ColumnLayout() {
    const columnLayout = document.createElement('div')
    columnLayout.className = "column-layout"
    columnLayout.innerHTML=`
        <div class="column-container">
            <div>column</div>
            <div>column</div>
            <div>column</div>
        </div>
    `;
    loadCss('../src/layout/Column/Column.css')
    return columnLayout
}

