
export class ColumnData {

    constructor(name = '', data = []) {
        this.name = name;
        this.data = data;
    }

    addData(newCard){
       this.data.push(newCard);
    }

    removeData(cardIndex){
        this.data = this.data.filter( (d,index) =>  index !== cardIndex);
    }

}