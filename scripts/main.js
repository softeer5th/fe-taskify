import Column from './components/column.js';

const App = () => {
  const main = document.querySelector('main');

  main.appendChild(Column('해야할 일'));
  main.appendChild(Column('하고 있는 일'));
  main.appendChild(Column('완료한 일'));

  document.querySelector('#history').addEventListener('click', (e) => {
    console.log('view archived columns');
  });
  document.querySelector('header div button').addEventListener('click', (e) => {
    console.log('convert to sort mode');
  });
};

App();
