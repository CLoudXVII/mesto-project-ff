const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');

cardRemove = (evt) => evt.target.closest('.card').remove();

function cardCreate (card) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', cardRemove);
  return cardElement
}

initialCards.forEach(element => cardList.append(cardCreate(element)));
