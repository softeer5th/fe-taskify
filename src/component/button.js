export default function Button({ className, onClick, children }) {
  const buttonElement = document.createElement("button");
  buttonElement.classList.add("button");
  buttonElement.classList.add(...className);
  children.forEach((child) => buttonElement.appendChild(child));
  buttonElement.addEventListener("click", onClick);

  return buttonElement;
}
