cardTemplate = document.querySelector('#card-template').content;
cardList = document.querySelector('.places__list');

cardRemove = (evt) => evt.target.closest('.card').remove();

function cardAdd (card) {
  cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', cardRemove);
  cardList.append(cardElement);
}

for (let i = 0; i < initialCards.length; i++) {
  cardAdd(initialCards[i])
}
