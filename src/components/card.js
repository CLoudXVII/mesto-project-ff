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
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', removeCardFunction);
  cardElement.querySelector('.card__like-button').addEventListener('click', likeCardFunction);
  cardImage.addEventListener('click', imagePopupFunction);
  return cardElement;
}
