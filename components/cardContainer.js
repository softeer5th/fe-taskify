// 카드만 모아둔 container.
import { parseToDoc } from "../utils/parseToDoc.js";
export const cardContainer = () => {
  const cardContainerHTML = /*html*/ `
    <div class="card-container"></div>
    `;
  return parseToDoc(cardContainerHTML);
};
