export function createHeader() {
  return {
    element: document.createElement("header"),

    render() {
      this.element.className = "header";
      this.element.innerHTML = `
        <h3 class="header__title">TASKIFY</h3>
        <button class="header__button--sort">
          <svg width="100%" height="100%" data-slot="icon" fill="none" stroke-width="2.5" stroke="#6E7191" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"></path>
          </svg>
          생성 순
        </button>
        <button class="header__button--history">
          <svg width="100%" height="100%" data-slot="icon" fill="none" stroke-width="2" stroke="#6E7191" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
          </svg>
        </button>
      `;
    },

    mount(parent) {
      this.render();
      parent.appendChild(this.element);
    },

    unmount() {
      this.element.remove();
    },

    bindSortButton(handler) {
      this.element.querySelector(".header__button--sort").addEventListener("click", handler);
    },

    bindHistoryButton(handler) {
      this.element.querySelector(".header__button--history").addEventListener("click", handler);
    },
  };
}
