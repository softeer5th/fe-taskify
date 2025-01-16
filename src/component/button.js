export default function Button({ className, onClick, children }) {
  const buttonElement = document.createElement("button");
  buttonElement.classList.add("button");
  buttonElement.classList.add(...className);
  children.forEach((child) => buttonElement.append(child));
  buttonElement.addEventListener("click", onClick);

  return buttonElement;
}
