import Column from './components/column.js';
import { updateColumn, loadTodos } from './utils/helpers/localStorageHelper.js';

const App = () => {
  const main = document.querySelector('main');
  console.log(loadTodos());

  loadTodos().forEach((column) => {
    main.appendChild(Column(column));
  });

  document.querySelector('#history').addEventListener('click', (e) => {
    console.log('view archived columns');
  });
  document.querySelector('header div button').addEventListener('click', (e) => {
    console.log('convert to sort mode');
  });
};

App();
