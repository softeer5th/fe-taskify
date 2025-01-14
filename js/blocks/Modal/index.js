export class Modal {
    constructor({ message, onDelete }) {
      this.message = message;
      this.onDelete = onDelete;
      this.modalElement = null;
    }

    open() {
      if (!this.modalElement) {
        this.createModal();
      }
      this.modalElement.classList.add('active');
    }

    close() {
      if (this.modalElement) {
        this.modalElement.classList.remove('active');
      }
    }

    createModal() {
      const overlay = document.createElement('div');
      overlay.className = 'modal-overlay';

      const modal = document.createElement('div');
      modal.className = 'modal';

      const messageElement = document.createElement('p');
      messageElement.textContent = this.message;

      const actions = document.createElement('div');
      actions.className = 'actions';

      const cancelButton = document.createElement('button');
      cancelButton.className = 'cancel-btn';
      cancelButton.textContent = '취소';
      cancelButton.addEventListener('click', () => this.close());

      const deleteButton = document.createElement('button');
      deleteButton.className = 'delete-btn';
      deleteButton.textContent = '삭제';
      deleteButton.addEventListener('click', () => {
        this.onDelete();
        this.close();
      });

      actions.appendChild(cancelButton);
      actions.appendChild(deleteButton);

      modal.appendChild(messageElement);
      modal.appendChild(actions);
      overlay.appendChild(modal);

      document.body.appendChild(overlay);
      this.modalElement = overlay;
    }
}