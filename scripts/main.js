import Column from './components/column.js';
import { updateColumn, loadTodos } from './utils/helpers/localStorageHelper.js';
import createState from './store/models/stateHelper.js';

export let draggedCardState = createState(null);

const App = () => {
  const main = document.querySelector('main');

  loadTodos().forEach((column) => {
    main.appendChild(Column(column));
  });

  document.querySelector('#history-button').addEventListener('click', () => {
    document.querySelector('#history').style.display = 'flex';
  });
  document.querySelector('header div button').addEventListener('click', (e) => {
    console.log('convert to sort mode');
  });
};

App();