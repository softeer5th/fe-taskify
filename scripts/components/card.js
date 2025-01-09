const Card = () => {
  const card = document.getElementById('card-template').content.cloneNode(true);

  card.querySelector('li').addEventListener('click', (e) => {
    console.log('card click');
  });
  
  return card;
};

export default Card;
