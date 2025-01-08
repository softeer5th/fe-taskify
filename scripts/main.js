import Header from './components/header.js';
import Content from './components/content.js';

const App = () => {
  // 더미 컬럼
  const columnClone = document
    .getElementById('column-template')
    .content.cloneNode(true);

  // 더미 카드컴포넌트
  const cardTemplate = document.getElementById('card-template');
  for (let i = 0; i < 3; i++) {
    const cardClone = cardTemplate.content.cloneNode(true);
    columnClone.getElementById('column-section').appendChild(cardClone);
  }

  // 더미 컬럼을 추가
  document.getElementById('main').appendChild(columnClone);
};

App();
