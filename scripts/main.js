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
    
    const tmp = document.createElement('div');
    tmp.appendChild(cardClone);
    tmp.addEventListener('click', (e) => {
      console.log('tmp click', i);
    })
    columnClone.getElementById('column-section').appendChild(tmp);
    
  }


  // cardTemplate.addEventListener('click', (e) => {
  //   console.log('cardTemplate click');
  // });

  // 더미 컬럼을 추가
  document.getElementById('main').appendChild(columnClone);
  columnClone.addEventListener(
    'click',
    (e) => {
      console.log('cardTemplate click');
    },
    true
  );
};

App();
