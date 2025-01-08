import { deleteCard, changeLikeState } from './api.js'

// Функция удаление карточки
export function handleCardRemove(evt) {
  const cardElement = evt.target.closest('.card');
  cardElement.remove();
  deleteCard(cardElement.id);
}

// Функция лайка карточки
export function handleCardLike(evt) {
  const cardElement = evt.target.closest('.card');
  const likeCountElement = cardElement.querySelector('.card__like-count');
  const likeElement = evt.target;
  if (likeElement.classList.contains('card__like-button_is-active')) {
    likeElement.classList.remove('card__like-button_is-active');
    changeLikeState(cardElement.id, false)
      .then(data => {
        likeCountElement.textContent = data.likes.length
      })
  } else {
    likeElement.classList.add('card__like-button_is-active');
    changeLikeState(cardElement.id, true)
      .then(data => {
        likeCountElement.textContent = data.likes.length
      })
  }
}

// Функция добавление карточки с помощью template
export function createCard(card, user, removeCardFunction, likeCardFunction, imagePopupFunction) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardElement.id = card._id;
  cardElement.querySelector('.card__title').textContent = card.name;
  if (card.owner._id === user._id) {
    cardDeleteButton.addEventListener('click', removeCardFunction);
  } else {
    cardDeleteButton.disabled = true;
    cardDeleteButton.classList.add('card__delete-button_is-disabled');
  }
  console.log(card.likes);
  card.likes.forEach(element => {
    if (element._id === user._id) {
      cardLikeButton.classList.add('card__like-button_is-active');
      return
    }
  })
  cardLikeButton.addEventListener('click', likeCardFunction);
  cardElement.querySelector('.card__like-count').textContent = card.likes.length;
  cardImage.addEventListener('click', imagePopupFunction);
  return cardElement;
}
