import { AlertDialog } from "../components/alert.js";

export class AlertManager {
    
    constructor() {
        this.modal = document.createElement("div");
        this.modal.id = "alert";

        document.body.insertBefore(this.modal, document.body.firstChild);
        
        this.hideDialog();
    }

    showDialog(text, onConfirmClck = () =>{}, onDismissClick = () => {}) {
        
        this.alert = new AlertDialog(text,onConfirmClck, onDismissClick).createDOM();

        this.modal.appendChild(this.alert);

        this.modal.classList.remove("hide");
    }

    hideDialog() {
        if (this.modal && this.modal.firstChild) {
            this.modal.removeChild(this.modal.firstChild);
        }

        this.modal.classList.add("hide");
    }
}