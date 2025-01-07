export default function Card({ id, title, description, createdAt, device }) {
  return `
    <div class="card" data-card-id="${id}">
        <div class="card__header">
            <h4 class="card__header--title">${title}</h4>
            <button class="card__header--delete">×</button>
        </div>
        <div class="card__body">
            <p class="card__body--description">${description}</p>
            <p class="card__body--createdAt">${createdAt}</p>
            <p class="card__body--device">${device}</p>
        </div>
    </div>`;
}
