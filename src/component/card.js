export default function Card({ id, title, description, createdAt, device }) {
  return `
    <div class="card" data-card-id="${id}">
        <div class="card__content">
          <div class="card__content--title">
            ${title}
          </div>
          <div class="card__content--description">${description}</div>
          <div class="card__content--device">
            author by ${device}
          </div>
        </div>
        <div class="card__button">
          <button class="card__button--delete">
            ×
          </button>
          <button class="card__button--edit">
            <svg width="100%" height="100%" data-slot="icon" fill="none" stroke-width="1.5" stroke="#A0A3BD" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"></path>
            </svg>
          </button>
        </div>
    </div>`;
}
