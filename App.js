import { Header } from './src/components/Header/Header.js';
import { ColumnLayout } from './src/layout/Column/ColumnLayout.js';
import { handleEventListener } from './src/utils/eventUtils.js';
import { doneModel, progressModel, todoModel } from './src/utils/mockup.js';





function App(){
    
    const app = document.getElementById('app');
    app.addEventListener('click',handleEventListener)
    const header = Header();
    app.appendChild(header);
    const columnLayout = ColumnLayout({todoModel,progressModel,doneModel});
    app.appendChild(columnLayout);
    

}

App()



