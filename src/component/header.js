export default function Header() {
  const header = document.createElement("header");
  header.className = "header";

  const title = document.createElement("h3");
  title.className = "header__title";
  title.textContent = "TASKIFY";

  const sortButton = document.createElement("button");
  sortButton.className = "header__button--sort";
  sortButton.innerHTML = `
        <svg width="100%" height="100%" data-slot="icon" fill="none" stroke-width="2.5" stroke="#6E7191" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"></path>
        </svg>
        생성 순
    `;

  const historyButton = document.createElement("button");
  historyButton.className = "header__button--history";
  historyButton.innerHTML = `
        <svg width="100%" height="100%" data-slot="icon" fill="none" stroke-width="2" stroke="#6E7191" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
        </svg>
    `;

  header.appendChild(title);
  header.appendChild(sortButton);
  header.appendChild(historyButton);

  return header;
}
