import { Header } from './src/components/Header/Header.js';


function App(){
    const app = document.getElementById('app');
    const header = Header();
    app.appendChild(header);
}

App()

