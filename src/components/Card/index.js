import { Icon } from "../../constants/icons/index.js";
import { typos, colors } from "../../constants/tokens/index.js";
import { parser } from "../../lib/jsx-runtime/index.js";
import { Button } from "../Button/index.js";

/**
 *
 */
const Buttons = () => parser`
        <div class="card-buttons">
            ${Button({ label: "Button", isFull: true })}
            ${Button({ label: "Button", isFull: true })}
        </div>
    `;

/**
 *
 */
const Icons = () => parser`
        <div class="card-icon-container">
            ${Icon({ name: "close", fillColor: colors.text.weak })}
            ${Icon({ name: "edit", strokeColor: colors.text.weak })}
        </div>
`;

/**
 *
 * @param {object} props - 카드 컴포넌트에 전달되는 props.
 * @param {string} props.title - 카드의 제목.
 * @param {string} props.body - 카드의 본문.
 * @param {"default"|"add-edit"|"drag"|"place"} [props.type] - 카드의 타입.
 * @param {string} [props.caption] - 카드의 캡션.
 * @returns {VDOM} - 카드 컴포넌트 가상 돔
 */
export const Card = ({
  title, body, caption, type = "default",
}) => {
  /**
   *
   */
  const findContents = () => {
    if (type === "add-edit") return Buttons();
    return Icons();
  };

  return parser`
    <div class="card-container ${type}">
        <div class="card-text-container">
            <div class="${typos.display.bold[14]} card-title">${title}</div>
            <div class="${typos.display.medium[14]} card-body">${body}</div>
            ${caption && parser`<div class="${typos.display.medium[12]} card-body">${caption}</div>`}
        </div>
        ${findContents()}
    </div>
    `;
};
