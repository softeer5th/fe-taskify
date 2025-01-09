import { Button } from "../components/Button/index.js";
import { parser } from "../lib/jsx-runtime/index.js";

// eslint-disable-next-line
const App = () => {
  const container = "hihi";
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

  return (
    parser`
        <div class=${container}>
            <div>
                <h1>HI!!!</h1>
                <h2>My name is Hamm</h2>
            </div>
            <div>hello</div>
            ${button}
            ${iconButton}
            ${icon}
        </div>`
  );
};

export default App;
