import { Badge } from "../components/Badge/index.js";
import { Button } from "../components/Button/index.js";
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
  const iconButton = Button({
    label: "Button",
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

  return (
    parser`
        <div>
            ${button}
            ${iconButton}
            ${icon}
            ${ghost}
            ${badge}
            ${badge2}
            ${chip}
        </div>`
  );
};

export default App;
