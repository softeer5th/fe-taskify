import CardForm, { onSubmit } from '../components/cardForm.js';
import { onReset } from '../components/cardForm.js';

export function addTask(idx) {
    const cardFormArea = document.getElementsByClassName("card_add")[idx];
    cardFormArea.innerHTML = CardForm(idx);
    const forms = document.getElementsByClassName('card_form');
    for(let form of forms) {
        form.addEventListener('submit', (e)=>onSubmit(e, idx));
        form.getElementsByTagName('button')[0].addEventListener('click', (e)=>onReset(e))
    }
}

export function deleteTask() {

}