import { parseToDoc } from "../utils/parseToDoc.js";
export const header = () => {
  const headerHTML =
    /*html*/
    `<header>
    <div class="service-title">
      <div class="service-name text-strong">TASKIFY</div>
      <div class="sort-btn">
      <img src="./assets/icons/sortBtn.svg" alt="" />
      <div class="sort-method">생성 순</div>
    </div>
    </div>
    <div class="service-history">
      <img src="./assets/icons/history.svg" alt="" />
    </div>
  </header>`;

  return parseToDoc(headerHTML);
};
