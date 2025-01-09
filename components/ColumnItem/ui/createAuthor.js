import { createElement } from "../../../dom.js";

const createAuthor = ({ author }) => {
  return createElement("span", {
    className: "userAgent display-medium12",
    text: `author by ${author}`,
  });
};

export default createAuthor;
