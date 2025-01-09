import { parseToDoc } from "../utils/parseToDoc.js";

export const eachColumn = (columnType) => {
  const eachColumnHTML = /*html*/ `<section class="${columnType}-wrapper"></section>`;
  return parseToDoc(eachColumnHTML);
};
