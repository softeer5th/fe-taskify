import { Header } from './src/components/Header/Header.js';
import { ColumnLayout } from './src/layout/Column/ColumnLayout.js';


function App(){
    const app = document.getElementById('app');

    const header = Header();
    app.appendChild(header);


    const columnLayout = ColumnLayout();
    app.append(columnLayout);
    


}

App()

