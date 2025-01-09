export default function Button({
  type = "button",
  size = "medium",
  format = "default", // [icon, text, icon-text]
  style = "default", // [default, brand, danger]
  disabled = false,
  onClick,
  children,
}) {
  const button = document.createElement("button");
  button.setAttribute("type", type);

  button.classList.add(
    "button",
    `button__${size}`,
    `button__${format}`,
    `surface-${style === "default" ? "alt" : style}`,
    `text-${style === "default" ? "" : "white-"}default`,
    `display-bold14`
  );

  if (disabled) {
    button.setAttribute("disabled", "true");
    button.classList.add("button--disabled");
  }

  if (children) {
    button.appendChild(children);
  }

  if (onClick) {
    button.addEventListener("click", onClick);
  }

  return button;
}
