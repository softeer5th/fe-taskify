import { Alert } from "../components/Alert/index.js";
import { Badge } from "../components/Badge/index.js";
import { Button } from "../components/Button/index.js";
import { Card } from "../components/Card/index.js";
import { Chip } from "../components/Chip/index.js";
import { useState } from "../lib/hooks/index.js";
import { parser } from "../lib/jsx-runtime/index.js";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const button = Button({
    label: "알럿창 열기",
    onClick() {
      setIsOpen(true);
    },
  });
  const button2 = Button({
    label: "Button",
    variant: "sub",
  });
  const iconButton = Button({
    label: "Button",
    variant: "danger",
    showIcon: true,
  });
  const icon = Button({
    showIcon: true,
  });
  const ghost = Button({
    label: "Button",
    type: "ghost",
  });

  const badge = Badge({ text: "1" });
  const badge2 = Badge({ text: "10" });

  const chip = Chip({ label: "Chip" });

  const card = Card({ title: "TITLE", body: "BODY", caption: "author by web" });
  const addCard = Card({
    title: "TITLE",
    body: "BODY",
    type: "add-edit",
    // eslint-disable-next-line
    onClickLT: () => console.log("lt"),
  });
  const dragCard = Card({
    title: "TITLE", body: "BODY", caption: "author by web", type: "drag",
  });
  const placeCard = Card({
    title: "TITLE",
    body: "BODY",
    caption: "author by web",
    type: "place",
    onClickRB() {
      console.log("rb");
    },
  });

  const alert = Alert({
    text: "선택한 카드를 삭제할까요?",
    isOpen,
    onClose() {
      setIsOpen(false);
    },
    rightOnClick() {
      console.log("삭제");
    },
  });

  return (
    parser`
        <div>
            ${button}
            ${button2}
            ${iconButton}
            ${icon}
            ${ghost}
            ${badge}
            ${badge2}
            ${chip}
            ${card}
            ${addCard}
            ${dragCard}
            ${placeCard}
            ${isOpen && alert}
        </div>`
  );
};

export default App;
