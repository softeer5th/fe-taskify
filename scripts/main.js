import Column from './components/column.js';

const App = () => {
  const main = document.getElementById('main');

  main.appendChild(Column());
  main.appendChild(Column());
  main.appendChild(Column());
};

App();
