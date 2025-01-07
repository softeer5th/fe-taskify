import Test from "../components/test.js";
import { parser } from "../lib/index.js";

// eslint-disable-next-line
const App = () => {
  const container = "hihi";

  return (
    parser`
        <div class=${container}>
            <div>
                <h1>HI!!!</h1>
                <h2>My name is Hamm</h2>
            </div>
            <div>hello</div>
            ${Test()}
        </div>`
  );
};

export default App;
