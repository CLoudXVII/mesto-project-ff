// Функция удаление карточки
export function handleCardRemove(evt) {
  evt.target.closest('.card').remove();
}

// Функция лайка карточки
export function handleCardLike(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

// Функция добавление карточки с помощью template
export function createCard(card, userId, removeCardFunction, likeCardFunction, imagePopupFunction) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;
  if (card.owner._id === userId) {
    cardDeleteButton.addEventListener('click', removeCardFunction);
  } else {
    cardDeleteButton.disabled = true;
    cardDeleteButton.classList.add('card__delete-button_is-disabled');
  }
  cardElement.querySelector('.card__like-button').addEventListener('click', likeCardFunction);
  cardElement.querySelector('.card__like-count').textContent = card.likes.length;
  cardImage.addEventListener('click', imagePopupFunction);
  return cardElement;
}
