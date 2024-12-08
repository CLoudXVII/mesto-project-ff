// Функция удаление карточки
export function handleCardRemove(evt) {
  evt.target.closest('.card').remove();
}

// Функция лайка карточки
export function handleCardLike(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

// Функция добавление карточки с помощью template
export function createCard(card, removeCardFunction, likeCardFunction, imagePopupFunction) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', removeCardFunction);
  cardElement.querySelector('.card__like-button').addEventListener('click', likeCardFunction);
  cardElement.querySelector('.card__image').addEventListener('click', imagePopupFunction);
  return cardElement;
}
