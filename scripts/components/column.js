import Card from './card.js';

const Column = (columnTitle) => {
  const column = document
    .getElementById('column-template')
    .content.cloneNode(true);

  column.querySelector('h2').textContent = columnTitle;

  column.querySelector('ul').appendChild(
    Card('default', {
      id: 1,
      title: '모던 자바스크립트 예제 실습',
      body: '1장 예제 내용 실습 후, 커밋까지',
      createdDate: '2021-08-10',
    })
  );
  column.querySelector('ul').appendChild(
    Card('add', {
      id: 2,
      title: 'GitHub 공부하기',
      body: 'add, commit, push',
      createdDate: '2021-08-10',
    })
  );
  column.querySelector('ul').appendChild(
    Card('drag', {
      id: 3,
      title: '카드 제목',
      body: '카드 내용',
      createdDate: '2021-08-10',
    })
  );
  column.querySelector('ul').appendChild(
    Card('place', {
      id: 4,
      title: '카드 제목',
      body: '카드 내용',
      createdDate: '2021-08-10',
    })
  );
  column.querySelector('ul').appendChild(
    Card('add', {
      id: 4,
      title: null,
      body: null,
      createdDate: '2021-08-10',
    })
  );

  column.querySelector('#add-card').addEventListener('click', (e) => {
    console.log('add card');
  });
  column.querySelector('#close-column').addEventListener('click', (e) => {
    console.log('close column');
  });

  return column;
};

export default Column;
