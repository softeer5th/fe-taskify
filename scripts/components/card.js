const Card = () => {
  const wrapper = document.createElement('div');

  const card = document.getElementById('card-template').content.cloneNode(true);

  wrapper.appendChild(card);

  wrapper.addEventListener('click', (e) => {
    console.log('card click');
  });

  return wrapper;
};

export default Card;
