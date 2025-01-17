import Column from './components/column.js';
import {
  loadTodos,
  loadHistory,
  initHistory,
} from './utils/helpers/localStorageHelper.js';
import createState from './store/models/stateHelper.js';
import {
  addLogToHistory,
  removeAllHistory,
} from './utils/helpers/etcHelper.js';
import { toggleDisplay } from './utils/helpers/cardHelper.js';

export let draggedCardState = createState(null);

const App = () => {
  const main = document.querySelector('main');

  loadTodos().forEach((column) => {
    main.appendChild(Column(column));
  });

  // 히스토리 바깥 클릭시 닫히도록
  document.addEventListener('mousedown', (event) => {
    const history = document.getElementById('history');

    // 히스토리 열렸을 때만 활성화하도록
    if (history.style.display === 'none') return;

    const isClickInside = history.contains(event.target);

    if (!isClickInside) {
      history.style.display = 'none';
    }
    console.log(event);
  });

  document.querySelector('#init-history').addEventListener('click', () => {
    removeAllHistory();
    initHistory();
    toggleDisplay(document.querySelector('#init-history'), false);
    toggleDisplay(document.querySelector('#empty-log'), true);
    toggleDisplay(document.querySelector('#log-div'), false);
  });

  document.querySelector('#history-button').addEventListener('click', () => {
    console.log('open history');
    removeAllHistory();

    const history = loadHistory();
    if (history.length > 0) {
      toggleDisplay(document.querySelector('#init-history'), true);
      toggleDisplay(document.querySelector('#empty-log'), false);
      toggleDisplay(document.querySelector('#log-div'), true);
      loadHistory().forEach((log) => {
        addLogToHistory(log);
      });
    } else {
      toggleDisplay(document.querySelector('#init-history'), false);
      toggleDisplay(document.querySelector('#empty-log'), true);
      toggleDisplay(document.querySelector('#log-div'), false);
    }

    document.querySelector('#history').style.display = 'flex';
  });

  document.querySelector('header div button').addEventListener('click', (e) => {
    console.log('convert to sort mode');
  });
};

App();
