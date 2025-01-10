import { Badge } from "../components/Badge/index.js";
import { Button } from "../components/Button/index.js";
import { Card } from "../components/Card/index.js";
import { Chip } from "../components/Chip/index.js";
import { parser } from "../lib/jsx-runtime/index.js";

// eslint-disable-next-line
const App = () => {
  const button = Button({
    label: "Button",
    // eslint-disable-next-line
    onClick: () => {
      console.log("버튼 클릭");
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
    // eslint-disable-next-line
    onClickRB: () => {
      console.log("rb");
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
        </div>`
  );
};

export default App;
