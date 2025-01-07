const $TODO_ADD_BUTTON = document.querySelector("#todo__section .add__button");

const createNode = (tagName, id = null, className = null, text) => {
  const node = document.createElement(tagName);

  node.id = id ?? undefined;

  className &&
    className.split(" ").forEach((className) => {
      node.classList.add(className);
    });

  node.textContent = text;

  return node;
};

const createColumnItem = () => {
  const $columnItem = createNode("div", null, "column__item");

  const $textContainer = createNode("div", null, "column__item__textContainer");

  const $textBox = createNode("div", null, "column__item__textBox");
  const $title = createNode(
    "div",
    null,
    "column__item__title display-bold14",
    "Github 공부하기"
  );
  const $content = createNode(
    "div",
    null,
    "column__item__content display-medium14",
    "add, commit, push"
  );
  $textBox.appendChild($title);
  $textBox.appendChild($content);

  const $userAgent = createNode(
    "span",
    null,
    "userAgent display-medium12",
    "author by web"
  );

  $textContainer.appendChild($textBox);
  $textContainer.appendChild($userAgent);

  const $buttonContainer = createNode(
    "div",
    null,
    "column__item__buttonContainer"
  );
  const $deleteButton = createNode("button", null, null, "X");
  const $editButton = createNode("button", null, null, "edit");

  $buttonContainer.appendChild($deleteButton);
  $buttonContainer.appendChild($editButton);

  $columnItem.appendChild($textContainer);
  $columnItem.appendChild($buttonContainer);
  return $columnItem;
};

const addTodoItem = () => {
  const $todoColumn = document.querySelector("#todo__section .column__body");
  const $columnItem = createColumnItem();
  $todoColumn.appendChild($columnItem);
};

$TODO_ADD_BUTTON.addEventListener("click", addTodoItem);
