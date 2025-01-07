import Component from "../components/component";


class App extends Component{
    constructor(parent ){
        this.parent = parent;
    }
    
    template(){
        return `
            <div id = "header"></div>
            <div id = "column"></div>
        `
    }

    render(){
        this.parent.innerHTML = this.template();
    }

    addEvent(){

    }
}