import { Header } from './src/components/Header/Header.js';
import { ColumnLayout } from './src/layout/Column/ColumnLayout.js';
import { handleEventListener } from './src/utils/eventUtils.js';
import { data } from './src/utils/mockup.js';


function App(){

    const app = document.getElementById('app');
    app.addEventListener('click',handleEventListener)
    const header = Header();
    app.appendChild(header);


    const columnLayout = ColumnLayout(data);
    app.appendChild(columnLayout);
    


}

App()

