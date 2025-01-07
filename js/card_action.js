import renderTemplate from "./main.js";

function confirmAddCard(){
    renderTemplate('./html/card_template.html', 'card-template', 'card-list', {id:0, title:"해야할 일", cardCount:"0",});
}